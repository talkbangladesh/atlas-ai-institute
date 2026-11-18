import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ENQUIRY_COPY,
  WEB3FORMS_ENDPOINT,
  WEB3FORMS_FROM_NAME,
  type EnquiryFormConfig,
  type FormFieldDefinition,
} from '../config/forms';
import { Button } from './Button';
import { NoteBox } from './NoteBox';

interface EnquiryFormProps {
  config: EnquiryFormConfig;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBMISSION_TIMEOUT_MS = 15_000;

function isValidHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function buildInitialValues(
  fields: readonly FormFieldDefinition[]
): Record<string, string> {
  const initial: Record<string, string> = {};
  for (const field of fields) {
    initial[field.name] = '';
  }
  return initial;
}

export function EnquiryForm({ config }: EnquiryFormProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    buildInitialValues(config.fields)
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [jsReady, setJsReady] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);
  const errorSummaryRef = useRef<HTMLDivElement | null>(null);
  const submitGuardRef = useRef(false);

  useEffect(() => {
    setJsReady(true);
    setValues(buildInitialValues(config.fields));
    setErrors({});
    setStatus('idle');
    setLiveAnnouncement('');
    submitGuardRef.current = false;
  }, [config]);

  const getFieldId = (fieldName: string) => `${config.id}-${fieldName}`;
  const getErrorId = (fieldName: string) => `${config.id}-${fieldName}-error`;
  const getHelperId = (fieldName: string) => `${config.id}-${fieldName}-helper`;

  const validateAll = (
    trimmed: Record<string, string>
  ): Record<string, string> => {
    const nextErrors: Record<string, string> = {};

    for (const field of config.fields) {
      const val = trimmed[field.name] ?? '';

      if (field.required && !val) {
        nextErrors[field.name] =
          field.type === 'select'
            ? `Please select ${field.label.toLowerCase()}.`
            : `Please enter ${field.label.toLowerCase()}.`;
        continue;
      }

      if (val && field.type === 'email' && !EMAIL_PATTERN.test(val)) {
        nextErrors[field.name] = 'Please enter a valid email address.';
      }

      if (val && field.type === 'url' && !isValidHttpUrl(val)) {
        nextErrors[field.name] =
          'Please enter a valid URL starting with https:// or http://.';
      }
    }

    return nextErrors;
  };

  const handleFieldChange = (name: string, nextValue: string) => {
    setValues((prev) => ({ ...prev, [name]: nextValue }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
    if (status === 'error') {
      setStatus('idle');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitGuardRef.current || status === 'submitting') return;

    const trimmed: Record<string, string> = {};
    for (const field of config.fields) {
      trimmed[field.name] = (values[field.name] ?? '').trim();
    }
    setValues(trimmed);

    const validationErrors = validateAll(trimmed);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const count = Object.keys(validationErrors).length;
      setLiveAnnouncement(
        `Form not submitted. ${count} ${count === 1 ? 'field requires' : 'fields require'} attention.`
      );
      window.requestAnimationFrame(() => {
        errorSummaryRef.current?.focus();
      });
      return;
    }

    setErrors({});
    setStatus('submitting');
    setLiveAnnouncement(ENQUIRY_COPY.sendingLabel);
    submitGuardRef.current = true;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(
      () => controller.abort(),
      SUBMISSION_TIMEOUT_MS
    );

    try {
      const formElement = formRef.current;
      const formData = formElement ? new FormData(formElement) : new FormData();

      for (const field of config.fields) {
        formData.set(field.name, trimmed[field.name]);
      }

      const payload: Record<string, unknown> = {};
      formData.forEach((value, key) => {
        if (key === 'botcheck') {
          payload[key] = value === 'on' || value === 'true';
        } else {
          payload[key] = typeof value === 'string' ? value.trim() : value;
        }
      });

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const data = (await response.json().catch(() => null)) as {
        success?: boolean;
      } | null;

      if (response.ok && data?.success) {
        setStatus('success');
        setLiveAnnouncement(ENQUIRY_COPY.successMessage);
      } else {
        setStatus('error');
        setLiveAnnouncement(
          `${ENQUIRY_COPY.submitErrorPrefix} ${ENQUIRY_COPY.directEmail}.`
        );
      }
    } catch {
      setStatus('error');
      setLiveAnnouncement(
        `${ENQUIRY_COPY.submitErrorPrefix} ${ENQUIRY_COPY.directEmail}.`
      );
    } finally {
      window.clearTimeout(timeoutId);
      submitGuardRef.current = false;
    }
  };

  const handleReset = () => {
    setValues(buildInitialValues(config.fields));
    setErrors({});
    setStatus('idle');
    setLiveAnnouncement('');
    submitGuardRef.current = false;
  };

  const errorEntries = config.fields
    .filter((field) => Boolean(errors[field.name]))
    .map((field) => ({
      fieldName: field.name,
      fieldId: getFieldId(field.name),
      message: errors[field.name],
    }));

  return (
    <div className="max-w-[65ch]">
      <div aria-live="polite" className="sr-only">
        {liveAnnouncement}
      </div>

      {status === 'success' ? (
        <div>
          <NoteBox className="mb-8">{ENQUIRY_COPY.successMessage}</NoteBox>
          <Button type="button" variant="ghost" onClick={handleReset}>
            {ENQUIRY_COPY.sendAnotherLabel}
          </Button>
        </div>
      ) : (
        <form
          ref={formRef}
          action={WEB3FORMS_ENDPOINT}
          method="POST"
          noValidate={jsReady}
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="access_key" value={config.accessKey} />
          <input type="hidden" name="subject" value={config.subject} />
          <input
            type="hidden"
            name="from_name"
            value={WEB3FORMS_FROM_NAME}
          />
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            aria-hidden="true"
            className="sr-only"
            defaultChecked={false}
          />

          {errorEntries.length > 0 && (
            <div
              ref={errorSummaryRef}
              tabIndex={-1}
              role="alert"
              className="mb-8 bg-[var(--white)] border border-[var(--hair)] border-l-2 border-l-[var(--crimson)] p-5 focus-visible:outline-[3px] focus-visible:outline-[var(--cobalt)] focus-visible:outline-offset-[3px]"
            >
              <p className="font-semibold text-[16px] text-[var(--ink)] mb-3">
                {ENQUIRY_COPY.errorSummaryHeading}
              </p>
              <ul className="list-none p-0 m-0 flex flex-col gap-2 text-[15px]">
                {errorEntries.map((err) => (
                  <li key={err.fieldName}>
                    <a
                      href={`#${err.fieldId}`}
                      onClick={(ev) => {
                        ev.preventDefault();
                        document.getElementById(err.fieldId)?.focus();
                      }}
                      className="text-[var(--ink)] underline hover:text-[var(--cobalt)]"
                    >
                      {err.message}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {status === 'error' && (
            <div
              role="alert"
              className="mb-8 bg-[var(--white)] border border-[var(--hair)] border-l-2 border-l-[var(--crimson)] p-5 text-[16px] leading-[1.6] text-[var(--ink)]"
            >
              {ENQUIRY_COPY.submitErrorPrefix}{' '}
              <a
                href={`mailto:${ENQUIRY_COPY.directEmail}`}
                className="text-[var(--cobalt)] font-medium underline"
              >
                {ENQUIRY_COPY.directEmail}
              </a>
              .
            </div>
          )}

          <div className="flex flex-col gap-6 mb-8">
            {config.fields.map((field) => {
              const fieldId = getFieldId(field.name);
              const errorMsg = errors[field.name];
              const errorId = getErrorId(field.name);
              const helperId = getHelperId(field.name);
              const describedBy =
                [
                  field.helperText ? helperId : null,
                  errorMsg ? errorId : null,
                ]
                  .filter(Boolean)
                  .join(' ') || undefined;

              return (
                <div key={field.name} className="flex flex-col gap-2">
                  <label
                    htmlFor={fieldId}
                    className="flex flex-wrap items-baseline justify-between gap-2 text-[17px] leading-[1.4] font-medium text-[var(--ink)]"
                  >
                    <span>{field.label}</span>
                    {field.required && (
                      <span className="font-[var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--muted)]">
                        {ENQUIRY_COPY.requiredMarker}
                      </span>
                    )}
                  </label>

                  {field.type === 'select' ? (
                    <select
                      id={fieldId}
                      name={field.name}
                      required={field.required}
                      value={values[field.name] ?? ''}
                      onChange={(e) =>
                        handleFieldChange(field.name, e.target.value)
                      }
                      aria-invalid={errorMsg ? 'true' : undefined}
                      aria-describedby={describedBy}
                      className="atlas-field-control"
                    >
                      <option value="">{ENQUIRY_COPY.selectPlaceholder}</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      id={fieldId}
                      name={field.name}
                      rows={field.rows ?? 6}
                      required={field.required}
                      value={values[field.name] ?? ''}
                      onChange={(e) =>
                        handleFieldChange(field.name, e.target.value)
                      }
                      aria-invalid={errorMsg ? 'true' : undefined}
                      aria-describedby={describedBy}
                      className="atlas-field-control"
                    />
                  ) : (
                    <input
                      id={fieldId}
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      autoComplete={field.autoComplete}
                      value={values[field.name] ?? ''}
                      onChange={(e) =>
                        handleFieldChange(field.name, e.target.value)
                      }
                      aria-invalid={errorMsg ? 'true' : undefined}
                      aria-describedby={describedBy}
                      className="atlas-field-control"
                    />
                  )}

                  {field.helperText && (
                    <p
                      id={helperId}
                      className="text-[14px] leading-[1.55] text-[var(--muted)]"
                    >
                      {field.helperText}
                    </p>
                  )}

                  {errorMsg && (
                    <p id={errorId} className="atlas-field-error">
                      {errorMsg}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              disabled={status === 'submitting'}
            >
              {status === 'submitting'
                ? ENQUIRY_COPY.sendingLabel
                : config.submitLabel}
            </Button>

            <p className="text-[14px] leading-[1.6] text-[var(--muted)] mt-4 max-w-[60ch]">
              {ENQUIRY_COPY.consentText}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
