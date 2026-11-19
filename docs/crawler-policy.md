# AI crawler and robots policy notes

Verified 2026-11-18 from official provider documentation. These notes document provider semantics for site owners; `robots.txt` and `llms.txt` are voluntary discovery/access signals, not security boundaries, and no rule guarantees indexing, exclusion, training behavior, or model output.

## OpenAI

- `OAI-SearchBot` surfaces websites in ChatGPT search results.
- `GPTBot` crawls content that may be used to improve and train OpenAI foundation models.
- `ChatGPT-User` fetches pages for certain user-requested ChatGPT or Custom GPT actions; OpenAI says user-triggered requests are distinct from automatic crawling and may not follow robots rules.
- `OAI-AdsBot` validates safety of ad landing pages and is not used to train generative foundation models.
- OpenAI documents independent robots controls for SearchBot and GPTBot. Blocking SearchBot can remove a site from ChatGPT search answers while still allowing navigational links, so it is not a complete appearance guarantee.

Sources: [OpenAI bots](https://developers.openai.com/api/docs/bots), [OpenAI SearchBot](https://openai.com/searchbot).

## Anthropic

- `ClaudeBot` is Anthropic’s training crawler.
- `Claude-SearchBot` supports search-result quality, relevance, accuracy, and indexing.
- `Claude-User` retrieves content when an individual asks Claude a question.
- `Claude-Agent` identifies hosted browser use and is separate from the robots/crawlers and fetchers.
- Anthropic says its bots honor standard robots directives and supports the `Crawl-delay` extension. Explicit rules naming `ClaudeBot` control training-crawler access; user-directed browser traffic has separate preferences.

Sources: [Anthropic web crawler guidance](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), [Anthropic hosted browsers](https://support.claude.com/en/articles/18234133-how-do-anthropic-hosted-browsers-identify-themselves-when-they-browse-the-web-on-a-user-s-behalf).

## Google

- `Googlebot` is the general Search crawler. Google also documents product-specific crawlers such as `Googlebot-Image`, `Googlebot-Video`, and `Googlebot-News`.
- User-triggered fetchers make requests on a user’s behalf and generally do not follow robots rules in the same way as automatic crawls.
- `Google-Extended` is a robots.txt control token, not a separate HTTP user-agent. It manages use of crawled content for future Gemini model training and related grounding uses; it does not control Google Search inclusion or rankings.
- Google states that robots.txt manages crawling rather than guaranteeing exclusion from search. A blocked URL may still appear when discovered through links; use `noindex` or access control when non-indexing is required.

Sources: [Google common crawlers](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers), [Google special crawlers](https://developers.google.com/crawling/docs/crawlers-fetchers/google-special-case-crawlers), [Google user-triggered fetchers](https://developers.google.com/crawling/docs/crawlers-fetchers/google-user-triggered-fetchers), [Google robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro), [Google crawler overview](https://developers.google.com/crawling/docs/crawlers-fetchers/overview-google-crawlers).

## Perplexity

- `PerplexityBot` crawls and indexes content so sites can be surfaced and linked in Perplexity search results. Its official crawler documentation says it is not used to crawl content for foundation-model training.
- `Perplexity-User` fetches a page when a user requests it and is generally separate from automatic crawling and training collection.
- Perplexity says PerplexityBot respects robots.txt, but a blocked page may still have its domain, headline, or a brief factual summary indexed. User-requested fetches can follow different rules.

Sources: [Perplexity crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers), [Perplexity robots.txt](https://www.perplexity.ai/help-center/en/articles/10354969-how-does-perplexity-follow-robots-txt), [Perplexity open-web agents](https://www.perplexity.ai/hub/blog/agents-or-bots-making-sense-of-ai-on-the-open-web).

## Microsoft / Bing

- `Bingbot` discovers new and updated pages for the Bing search index.
- `BingPreview`, `MicrosoftPreview`, and `BingVideoPreview` provide product previews; `AdIdxBot` supports advertising quality checks.
- Microsoft describes AI Training and AI Grounding as separate preferences. Its documented AI Training preference can be expressed in robots.txt; AI Grounding is page-level through metadata or an HTTP header. These preferences do not remove eligibility from traditional Bing Search.
- Microsoft warns that user-agent strings can be spoofed. Robots.txt is a voluntary crawler protocol, not access control.

Sources: [Bing crawlers](https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0), [Bing robots.txt](https://www.bing.com/webmasters/help/how-to-create-a-robots-txt-file-cb7c31ec), [Microsoft AI preferences](https://www.bing.com/webmasters/help/new-ai-preferences-2t1cc16d), [Bing robots metadata](https://www.bing.com/webmasters/help/robots-meta-tags-and-attributes-that-bing-supports-5198d240).

## Project policy

This project keeps public pages crawlable with `User-agent: *` and excludes only service/auth/storage paths. It does not add provider-specific training opt-outs because the requested public research site is intended to be discoverable and no separate training preference was provided. The implementation uses `noindex, follow` for the generated 404 page and route-specific canonical, Open Graph, X/Twitter, and JSON-LD metadata for known public routes.
