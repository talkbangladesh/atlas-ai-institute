import { useEffect, useRef } from 'react';

/* Geometry: land outlines (Natural Earth 110m, simplified) and Bangladesh border (50m). Built by scripts/build_geo.mjs */
const GEO = {
  land: [
    [-271,-215,11,-4,-2,-2,-6,1,-5,-2,-4,0,-12,4,-10,7,15,-5,3,4,4,2,2,-1,4,-4],
    [-234,-204,3,-2,-1,-2,-6,-1,-1,2,-4,-2,-2,2,11,3],
    [281,-199,-6,0,1,5,6,-2,-1,-3],
    [582,-163,3,-2,8,2,-1,-10,-2,1,-3,-3,-3,1,-5,9,0,2,3,0],
    [692,-164,1,-1,3,1,1,-1,-6,-8,1,-2,-6,-2,-4,-7,-5,-3,-10,2,1,5,14,8,6,8,3,2,1,-2],
    [698,-145,3,-4,0,3,3,-4,3,-2,7,1,-2,-6,-3,0,-5,-8,-3,-2,-2,2,2,3,-1,2,-5,2,3,3,1,5,-8,12,6,-3,1,-4],
    [668,-89,-1,-1,-5,3,-6,7,12,-9],
    [713,-69,1,-4,-4,0,1,3,2,1],
    [-720,-66,1437,-1,-2,-1,-1,1,4,1,-1437,2,-1,-2],
    [671,-66,-1,0,-1,2,2,-2],
    [668,-60,1,-3,-2,0,0,4,1,-1],
    [200,-54,2,-9,-3,0,0,-4,-11,-33,-6,-2,-6,2,-3,12,5,8,-2,10,2,5,7,2,6,5,0,3,2,0,4,7,3,-6],
    [574,-55,2,-3,2,1,3,-3,5,-16,9,-6,4,-7,4,-1,1,-4,7,-7,2,-3,1,-8,-2,-12,-11,-19,-1,-7,-7,-1,-8,-5,-5,2,0,2,-6,-3,-11,3,-5,7,-6,3,1,4,-2,-2,-4,-1,5,6,-1,3,-7,-8,-3,2,-4,8,-12,4,-20,-3,-8,-3,-2,-4,-15,0,-8,-4,-6,0,-6,3,0,3,3,1,0,7,-10,22,2,-2,-1,4,3,-3,-3,7,3,11,0,-3,2,3,8,4,16,4,6,6,0,4,3,3,2,-3,1,1,-1,2,1,2,2,-1,1,3,5,5,5,2,5,-4,5,-1,0,2,4,8,8,2,0,2,-3,1,2,0,12,-4,5,2,2,-2,-4,-4,-2,-7,19,-11,2,2,2,3,2,16,3,7,4,-12],
    [648,-42,2,-1,-3,0,-2,2,3,-1],
    [483,-41,-7,3,4,1,3,-4],
    [643,-39,-4,0,0,2,4,-2],
    [498,-41,-4,0,2,4,4,2,9,1,-9,-4,-2,-3],
    [472,-32,5,-3,-10,-1,5,4],
    [492,-32,-1,-3,-11,0,3,2,2,-1,7,2],
    [434,-27,8,-1,1,2,20,-7,-5,-2,-25,4,-12,4,3,3,5,0,5,-3],
    [539,-25,-2,-3,1,6,1,-3],
    [624,-27,-3,1,-3,5,6,-6],
    [608,-22,-7,-3,-8,2,6,1,2,2,0,-2,2,0,4,3,-1,2,3,0,-1,-5],
    [509,-14,-2,-1,-3,2,5,-1],
    [522,-12,1,-3,-11,1,1,3,9,-1],
    [613,-18,-2,-1,-1,4,-7,4,1,1,5,-3,4,-5],
    [537,-5,1,-6,4,-2,3,4,8,2,25,-8,6,-7,7,-2,1,-2,-4,-1,1,-3,14,-12,-11,1,-8,9,-5,1,-6,-2,1,-3,-3,-1,-7,1,-3,3,-4,1,-7,-2,5,5,-3,7,-17,8,-3,-2,-1,3,-3,2,7,2,-6,0,-7,5,8,3,7,-4],
    [501,6,-3,-4,-3,-1,-14,0,-1,-3,4,-4,9,4,0,-2,-2,0,-5,-4,7,-13,-2,-2,-2,2,2,3,-5,0,0,1,-2,3,0,3,-3,-1,1,-10,-5,0,1,8,-3,3,5,13,4,3,8,-1,9,2],
    [515,5,0,-4,-3,0,0,-5,-2,8,2,5,3,-4],
    [423,-23,-4,0,-9,6,-13,18,-3,6,-13,15,9,-1,13,-13,4,0,8,-8,-1,-3,3,-1,3,-5,4,-3,-1,-11],
    [471,7,5,-3,-5,-1,-1,-6,-4,-3,-1,-10,-1,1,-5,-1,-1,2,-5,2,-5,-2,-1,2,-6,0,-1,6,-4,4,0,7,3,3,6,-1,0,4,7,1,15,16,10,-6,-8,-9,3,-4,-1,-2],
    [506,34,0,-5,-1,-4,-2,4,-2,-2,1,-5,-5,3,0,4,-3,2,-6,-3,0,1,1,3,5,3,1,-2,7,3,0,3,3,-2,1,-3],
    [325,25,-4,-1,-2,3,0,6,2,6,6,-9,-2,-5],
    [-244,40,-4,0,1,3,3,1,0,-4],
    [496,41,-4,-5,-2,3,2,5,2,0,-1,-3,3,4,0,-4],
    [474,37,-5,-4,9,12,1,-3,-5,-5],
    [488,48,4,-2,-4,-4,0,6],
    [502,49,1,-5,-3,1,1,-4,-2,0,-2,5,3,0,0,1,-3,3,5,-1],
    [486,52,-1,-3,-4,5,5,-2],
    [485,74,4,0,1,-6,-3,-4,0,-7,9,-2,0,-5,-4,4,-1,-1,-3,2,-5,0,1,3,-1,1,-1,-1,-2,2,0,5,1,-1,2,10,2,0],
    [-262,73,-7,-1,0,1,7,0],
    [-308,71,-5,2,5,1,3,-2,-3,-1],
    [-290,79,10,0,7,-5,-2,-1,-8,1,-3,-4,-3,3,-9,0,1,2,8,0,-2,3,-3,1,4,0],
    [441,75,-3,-2,-3,1,0,3,8,3,1,-1,-3,-4],
    [-622,76,-2,0,1,5,4,-3,-3,-2],
    [-319,91,6,-1,10,-7,6,-2,-14,-2,3,3,-5,1,-2,3,-14,4,2,1,-13,-3,11,5,10,-2],
    [-310,95,-4,3,1,3,3,-6],
    [485,91,-2,-3,-3,6,6,7,2,-1,-3,-9],
    [-311,106,-5,0,0,1,5,-1],
    [-308,106,-1,-2,-2,4,3,-2],
    [539,137,-2,-4,-2,1,-3,-3,-3,1,3,4,7,1],
    [138,143,-6,-5,-3,2,9,3],
    [95,143,10,-2,-6,-1,-5,1,1,2],
    [62,153,-2,-7,-10,4,0,3,12,0],
    [37,165,2,-3,0,-5,-4,-1,-2,8,4,1],
    [564,149,-3,-8,-12,-3,-6,-4,-3,1,0,3,-16,-2,4,-3,-3,-7,-2,-2,-2,2,1,3,-4,4,12,9,13,0,4,7,3,-2,8,6,2,5,0,4,1,3,4,1,3,-9,-4,-4,0,-4],
    [38,169,-1,-3,-3,3,4,3,0,-3],
    [576,177,2,-1,3,2,1,-5,-6,-1,-3,-4,-7,3,-2,-5,-4,0,-1,4,2,3,5,1,2,8,8,-5],
    [-255,186,7,0,-3,-2,-7,3,2,1,1,-2],
    [-494,194,-9,1,-9,5,-1,3,10,-2,9,-7],
    [-225,203,-2,-4,2,2,3,-1,-1,-2,9,-1,-1,-3,3,1,1,-5,-1,-3,-5,0,0,4,-5,-3,-2,0,3,2,-4,1,-12,-1,2,3,-2,1,8,9,7,3,-3,-3],
    [-531,216,4,0,-1,-4,3,-3,-7,5,-1,3,2,-1],
    [575,203,4,-7,-6,1,-3,-6,4,-4,0,-2,-3,2,-3,-3,1,20,-3,4,1,5,3,2,-1,2,2,0,4,-14],
    [-27,209,-7,-2,-6,0,3,4,-2,5,12,5,4,-3,-4,-9],
    [51,222,-3,-3,-4,4,5,1,2,-2],
    [-612,228,-4,-1,-3,3,6,2,4,-2,-3,-2],
    [-12,235,-4,-5,8,1,-4,-7,4,0,4,-6,2,0,4,-6,5,-1,-3,-4,2,-2,-4,-2,-14,0,-9,-3,-2,1,9,5,-7,2,4,1,-2,2,1,3,6,0,0,2,-3,2,-4,1,-1,4,-2,-2,-3,6,5,8,8,0],
    [-662,240,-8,1,7,0,1,-1],
    [-317,249,-2,-2,-2,1,1,2,3,-1],
    [-328,251,-4,-2,-4,1,3,2,5,-1],
    [-687,255,12,-2,-3,-1,-8,1,-1,2],
    [-341,263,1,-2,20,-6,-4,-1,-8,2,-10,-4,-1,3,-6,-1,4,2,1,7,3,0],
    [-58,266,-1,-3,5,-2,-6,-4,-15,-3,-16,2,4,2,-9,2,7,2,-8,0,2,3,6,1,7,-3,6,2,5,-1,6,2,7,0],
    [-303,269,-5,-1,-1,2,2,3,7,-1,-3,-3],
    [-720,276,20,-7,0,-3,3,-1,-1,3,11,0,7,-4,-10,-2,0,-4,-2,-1,-12,3,-1,1,-8,1,-3,1,1,1,-5,-1,2,-1,-2,-2,1440,0,-10,-2,7,-6,0,-3,-8,1,-14,-3,-14,-7,-5,2,-11,-3,-2,2,-3,-2,-6,0,-6,-6,0,-2,5,-1,-1,-5,-3,-1,-2,-3,1,-2,-7,-2,-1,-4,-6,-1,-1,-4,-6,-4,-5,18,2,5,3,4,6,1,22,13,3,5,-5,0,-2,-3,-11,-5,-3,5,-10,-1,-10,-7,3,-2,-15,-2,0,3,-6,1,-5,-2,-25,-1,-28,-17,6,-1,6,-3,2,2,5,0,5,-5,1,-3,-4,-4,-2,-11,-7,-9,-14,-11,-5,-3,-5,2,-9,-5,-1,-4,-9,-5,0,-2,3,-3,5,-7,-2,-7,-10,-2,-2,9,3,1,-2,3,-6,1,2,6,-4,2,-13,-4,5,6,-2,2,-11,-7,-4,0,-2,-2,6,-3,0,-2,3,-1,4,2,6,-1,1,-2,-6,-1,-7,-7,4,-3,7,-10,0,-3,-3,-1,3,-4,-1,-6,-2,0,-10,-15,-11,-7,-7,-2,-2,1,-12,-4,-1,-5,-2,0,-1,5,-5,1,-10,-8,-1,-3,13,-15,1,-7,0,-7,-16,-13,-2,3,1,3,-6,3,-4,6,-7,2,1,3,-4,0,-3,-17,2,0,3,-7,10,-8,5,-17,-3,0,-8,6,-6,15,-6,8,-1,-3,2,15,-6,22,-8,-5,-4,1,0,9,-2,6,-6,4,-3,8,-4,0,-1,-4,-5,1,0,-1,-8,-1,0,-3,-2,-2,-6,-3,-11,-10,0,-2,-8,-2,-2,-23,-2,0,-1,-3,1,-1,-4,-1,-3,-4,-4,4,-12,28,-3,21,-9,-1,-5,4,2,2,-2,1,-7,5,-5,6,-19,-2,-16,3,-2,5,-2,1,-7,-3,-13,5,-6,10,-8,-1,3,-9,6,-4,2,-8,1,5,2,-1,0,-4,1,-3,9,0,9,10,2,-9,8,-3,4,-5,-5,-7,-3,-1,0,-5,-10,-5,0,-2,-11,-3,-1,-4,-14,-6,-12,-3,-3,-2,-6,0,-4,10,1,6,-7,11,-7,7,-3,10,-4,2,-9,15,-2,0,1,6,-4,-7,-6,8,6,-14,7,-9,-1,-4,5,-4,3,-14,4,-2,3,-8,16,-14,-2,-3,7,-5,26,6,0,-5,-6,-16,-7,-10,-30,-27,-4,-9,-2,-7,3,-1,-1,-7,5,-9,1,-16,-5,-8,-8,-3,-11,-9,0,-3,3,-6,0,-8,-12,-7,2,-2,-3,-10,-16,-16,-10,-5,-13,1,-12,-4,-5,4,-1,5,1,3,-12,19,-4,20,-10,16,0,9,3,9,5,6,0,5,-3,6,1,3,-5,14,-13,16,4,16,-1,3,-4,4,-10,-2,-7,8,-10,0,-15,-6,-11,2,-11,-4,-6,2,-14,10,-9,15,-7,5,-1,5,-3,5,4,6,1,7,-3,16,8,10,2,7,8,7,3,1,9,7,-1,5,2,5,9,6,4,7,15,-2,15,5,28,2,4,1,3,0,0,-2,3,1,-2,-2,2,-3,-1,-4,-2,-2,0,-2,20,-6,2,-3,13,-5,4,3,1,5,5,2,30,-8,8,3,4,-2,1,1,6,-1,3,2,6,13,1,4,-2,2,2,2,-6,0,-3,-2,-6,-1,-3,3,-8,-2,-8,2,-6,6,2,3,-2,2,4,4,6,0,2,3,8,-1,9,4,7,0,12,-4,8,0,6,4,-1,3,-19,10,6,4,-2,2,5,2,-16,-4,0,-2,6,-1,-1,-2,-9,-3,-3,1,1,2,-4,1,4,2,-1,1,-6,1,0,2,-4,-1,-4,-6,-4,0,-4,-10,4,-6,-5,0,-5,-3,-1,2,-4,1,-5,-1,3,-3,-2,0,-5,1,2,-4,-1,-1,4,-3,0,-2,-4,1,2,-2,-3,-1,2,-3,-3,0,-3,1,-3,6,-6,8,0,6,-14,7,-4,6,-3,1,-1,-2,0,3,-3,1,-4,-1,1,-6,11,-8,3,0,0,-2,10,-5,-1,-2,-6,3,-1,-3,3,-1,-1,-2,-4,-4,-1,0,1,4,-2,4,-14,7,-6,5,-1,4,-5,1,-10,-4,-8,1,-6,-2,0,-4,-9,-4,-4,-7,1,-2,-9,-8,-8,0,-5,-3,-4,4,-10,-1,1,6,-3,2,3,8,-3,9,6,3,24,-1,2,2,1,8,-7,6,-6,2,0,3,12,0,-2,4,4,-2,9,4,2,3,8,2,4,6,13,2,3,2,-3,6,2,6,8,3,-1,-3,3,-2,-5,-4,1,-4,4,-1,0,-1,6,2,6,-3,14,4,9,-1,1,1,5,2,-1,6,2,3,4,1,3,-3,3,0,2,6,-4,0,-1,3,19,1,4,2,-4,2,-21,-3,-6,4,1,4,-2,3,2,3,16,7,-1,2,-5,2,-7,-1,-4,-3,0,-2,-14,-7,-3,-6,7,-5,-4,-4,-4,-1,-3,-11,-5,1,-3,-3,-4,-1,-11,17,-7,-5,-6,-1,-5,2,-3,14,4,2,18,8,17,13,18,8,15,2,6,3,15,1,12,-3,-5,-1,4,-3,5,2,17,-4,18,-6,1,-3,-11,-3,-21,3,6,-3,1,-6,8,-3,1,2,-3,2,3,2,9,-3,4,1,-3,3,9,4,8,-2,2,3,-3,2,2,3,-3,2,11,-1,2,-2,-5,-1,0,-2,3,-1,7,1,1,2,22,5,3,0,-4,-2,21,3,5,-3,4,3,-4,2,2,1,12,-1,20,-6,3,2,-4,3,-5,1,1,2,-2,4,7,4,3,3,13,0,1,-2,-4,-3,4,-4,-1,-6,5,-2,-10,-9,5,0,10,6,-2,2,2,3,-5,0,-1,3,4,4,-6,3,8,2,-1,3,4,-2,-2,-4,4,0,-1,2,6,2,9,0,7,-2,-4,3,0,5,25,1,-3,2,5,2,24,4,14,0,16,2,5,3,9,2,7,-2,-5,0,9,-1,1,-2,15,1,13,-4,-1,-2,-18,-4,14,-1,2,-3,8,2,31,-3,0,3,15,-1,6,-2,2,-2,-2,-2,11,-5,4,4,6,-1,24,0,-2,4,5,1,36,-2,14,-6,24,0,3,-1,0,-3,5,-1,27,0,7,-3,5,1,-3,3,2,1,32,-2,-1434,-2],
    [196,165,6,-4,-4,0,-3,-6,2,-5,6,-3,12,1,1,8,-4,1,1,3,-2,0,1,4,7,0,-4,4,-3,-1,-1,-2,-1,6,-5,2,-4,5,4,0,0,3,7,0,0,6,-7,1,-9,-2,-9,-8,3,-3,0,-3,6,-7],
    [-383,276,-2,-1,-14,3,6,3,10,-5],
    [-720,286,10,-1,-10,-2,0,3],
    [-362,278,0,-4,5,3,5,-3,-1,-3,4,-2,7,6,0,5,12,-1,5,-2,0,-2,-3,-2,3,-3,-1,-2,-7,-2,-10,0,-6,-7,-5,-3,-6,0,-3,-2,0,-2,-5,-1,-5,-3,-4,-4,-2,-8,6,-1,4,-7,5,1,24,-8,11,0,0,-8,3,-4,6,-4,3,1,3,4,-2,7,-3,2,6,2,7,5,-3,6,-5,3,5,4,-3,10,17,1,10,-5,7,-1,1,-8,6,-3,6,2,7,6,12,-13,-1,-3,18,-6,1,-4,5,-2,0,-4,-17,-8,-26,0,-18,-14,9,6,15,4,3,-2,-3,-3,2,-7,5,-2,7,1,4,4,0,-3,3,-1,-22,-10,-3,0,-1,4,7,3,-11,0,1,-2,-12,-4,-3,-3,0,-3,3,-2,-15,-3,7,0,-8,-1,-4,-7,-2,2,2,-4,-4,-5,1,3,-2,5,0,-5,-3,1,3,-1,2,-10,-13,-8,-9,-8,0,-6,5,-12,-2,-7,-3,0,-2,2,-4,9,-1,4,-4,4,-4,-1,-6,3,-11,-1,-1,0,1,-4,-4,-1,-6,3,-8,0,-11,-6,-3,-3,0,-7,-2,-13,6,-13,7,-4,10,2,5,2,2,7,13,2,1,-3,-4,-10,-2,1,0,-8,-3,-2,16,0,6,-3,1,-4,-2,-13,6,-8,3,-1,8,3,11,-3,4,3,1,4,2,2,6,1,7,5,2,-2,-3,-2,1,-10,3,3,-2,5,5,2,1,3,7,-7,8,1,5,-3,3,3,9,0,-3,-1,1,-2,7,-2,0,-4,7,-2,2,-5,5,-3,13,-1,11,-6,3,-9,2,-1,0,-3,-3,-3,1,-1,8,-1,0,-4,3,3,11,-4,2,-3,0,-2,4,1,14,-1,11,-8,7,-2,3,-8,-2,-7,-14,-16,-2,-19,-7,-17,-4,-4,-11,-1,-12,-7,-3,-4,-2,-11,-19,-23,-5,-2,-5,1,-9,3,0,-2,5,-3,0,-3,2,-2,0,-2,-4,-5,-6,-2,-12,0,0,-8,-2,-1,-9,0,0,-4,3,-1,2,1,1,-2,-7,-4,-1,-6,-7,-2,-1,-3,7,-4,-1,-4,-5,-2,-2,-4,-6,-4,4,-6,-5,0,-5,-3,-1,-3,-16,6,-2,14,5,7,-6,1,4,4,2,7,4,-2,2,8,-3,2,-1,-5,-2,0,4,16,-1,8,1,1,7,18,0,15,2,4,3,32,0,6,-5,4,-18,10,-15,30,-6,4,1,2,-2,4,7,8,-1,2,-1,-2,-3,2,0,5,4,7,5,3,1,5,5,4,-1,1,0,11,-3,3,0,3,-5,3,-4,-4,2,-2,-4,-1,0,2,-10,3,-1,2,-5,4,0,-2,-3,2,0,4,-8,8,1,1,-15,3,-14,9,-7,-2,-28,10,-8,7,-1,2,2,4,-3,5,-13,11,0,4,-5,3,-1,2,-6,5,-4,9,-6,2,0,-6,13,-14,3,-10,5,-4,-2,-2,-9,8,0,5,-11,7,2,0,1,3,-5,4,-7,14,-5,4,-8,2,-16,23,0,10,2,11,-3,11,7,-1,2,-4,-1,8,-19,7,-2,4,1,2,-6,2,0,3,-11,8,-1,3,-5,4,-2,3,-11,1,-12,5,-29,6,-5,-1,1,-3,-15,-3,1,6,5,1,-1,1,-14,-8,3,-2,-4,-2,-8,-3,-9,-6,-25,-6,28,12,3,6,-8,-2,-5,2,-7,-1,1,4,-8,0,-6,3,0,2,-3,2,6,7,6,-1,9,3,-3,3,3,1,-17,-1,-6,1,-6,4,14,3,3,0,0,-2,8,0,-20,9,2,3,12,1,5,4,22,4,9,-2,43,-2,28,-5,8,3,6,-1,13,3,3,-2,3,3,10,-4,5,3,1,-3,11,1,30,-5,-5,-2,21,0,4,-2,5,2,-4,1,2,2,8,0,8,-3,11,-1,12,0,0,3,3,0,7,-1,-1,-4,3,3,3,0,2,4,-9,4,0,5,5,3,9,-3,6,-4,-4,-2,8,-1],
    [-457,292,-2,-1,9,1,6,-2,4,2,7,-5,2,1,-3,4,8,0,4,-1,4,-7,14,-4,0,-2,-7,0,3,-2,-2,-1,-14,2,-29,-3,-2,2,-9,1,-5,3,19,1,-22,1,-2,2,10,1,-14,1,7,5,10,2,4,-1],
    [-418,294,-4,-3,-6,3,10,0],
    [-305,292,-13,-1,-6,2,3,2,9,0,7,-3],
    [-346,293,3,-3,4,3,10,2,7,-4,-1,-3,12,3,14,-4,1,-2,7,1,4,-2,10,-2,7,-5,-7,-2,16,-4,5,-3,7,-1,-2,-2,-7,-5,-11,6,-5,-1,-1,-2,12,-5,2,-4,-1,-3,-15,4,10,-7,-19,4,-5,2,1,1,-11,4,-12,-2,-3,1,2,3,16,1,-1,1,6,6,-1,2,-15,5,2,1,-11,4,-9,-2,-15,1,-15,2,-3,1,4,2,-6,0,-1,4,3,4,15,2,-3,-2],
    [-401,295,11,0,2,-1,-4,-2,6,-2,-1,-3,-10,-2,-13,5,0,1,8,0,-4,2,5,2],
    [574,293,-15,0,9,2,6,-2],
    [-373,291,-4,-3,-5,0,-2,6,6,3,16,-2,-11,-4],
    [-482,286,-10,-2,-12,3,8,8,-4,2,30,0,8,-3,-15,-4,-5,-3,0,-1],
    [603,300,-5,-1,-14,2,1,1,18,-2],
    [-374,300,-3,-2,-10,2,8,3,5,-3],
    [580,302,-3,-3,-21,-1,-8,3,2,3,5,1,25,-3],
    [-394,307,3,-2,-2,-5,-6,0,-5,0,1,3,-7,-1,0,3,16,2],
    [-433,305,2,-2,7,1,1,-2,-2,-2,-24,-2,-6,1,8,2,-24,0,9,5,26,-4,-6,4,4,1,4,0,1,-2],
    [230,283,-15,0,-1,2,-8,1,0,2,4,1,0,2,8,4,-4,0,10,4,-1,1,42,7,8,1,2,-2,-41,-9,-12,-8,0,-3,8,-3],
    [-379,308,13,-1,3,-1,-1,-2,7,-2,32,1,6,-3,-9,-2,-31,0,-11,1,-2,5,-4,1,-12,2,1,2,8,-1],
    [-465,311,0,-3,-3,-2,-18,-2,-5,0,15,6,11,1],
    [-441,311,-7,-1,-6,1,15,1,-2,-1],
    [99,311,-9,-1,-7,1,3,1,-3,1,9,1,7,-3],
    [-439,314,-11,0,4,1,7,-1],
    [-383,312,-9,0,-3,3,13,-1,-1,-2],
    [-400,313,1,-1,-22,2,4,1,-5,1,0,1,19,-2,3,-2],
    [420,313,-22,-1,10,5,13,-2,-1,-2],
    [73,319,13,-3,-10,-2,-8,-7,-4,0,-9,3,4,1,-14,4,-3,4,26,1,5,-1],
    [102,322,8,-2,-6,-2,-12,0,-12,0,-11,3,33,1],
    [205,322,-15,-2,-4,1,2,1,-9,0,27,1,-1,-1],
    [400,316,-20,0,-15,5,19,4,17,-6,-1,-3],
    [-348,319,5,-2,-13,-4,-7,0,-9,0,-4,2,3,3,-7,-1,-7,4,10,3,-2,1,9,0,19,-4,3,-2],
    [-274,332,27,-1,-24,-5,9,0,-23,-7,-23,-2,6,0,-3,-1,3,-2,-17,-5,7,-2,-10,-2,-36,1,0,2,7,1,-2,3,13,-2,-12,3,12,4,-8,4,21,1,-23,0,-16,6,24,3,9,-2,3,2,13,2,43,-1],
    [-108,334,25,-3,-45,-2,29,-2,7,1,4,-1,-5,-2,30,3,12,-1,2,-2,-31,-4,9,0,-8,-6,0,-4,5,-3,-13,-1,8,-3,1,-3,-5,0,6,-4,-9,0,4,-2,-1,-1,-11,-1,5,-2,0,-2,-10,0,10,-3,2,-3,-7,-1,-8,4,1,-3,-4,-2,16,0,-22,-7,-16,-2,-10,-5,-22,-5,-4,-3,-2,-5,-6,-3,1,-3,-4,-8,-5,0,-6,3,-8,0,-14,12,-2,6,-6,3,2,3,-3,2,4,4,6,2,3,5,-11,-3,-5,1,2,5,11,-1,-10,4,-7,1,4,3,-10,9,-5,1,0,2,-11,2,-29,0,-12,4,19,2,-26,2,0,2,30,4,2,1,-11,1,23,5,-2,2,22,2,17,-1,10,2,24,-3,-10,2,1,2,33,3,46,0],
  ],
  bd: [
    [8905,2209,0,19,-13,35,-7,41,8,15,-21,6,-2,4,4,15,-17,23,13,33,2,28,-8,5,-24,6,-11,9,-7,-2,-7,3,-13,14,13,28,16,-3,14,31,37,-1,7,2,6,6,-13,11,-5,12,-17,1,-10,4,-14,16,-11,9,-10,2,-7,8,7,20,29,28,0,7,-9,4,2,8,5,1,20,-14,6,-8,0,-6,15,-4,14,0,1,4,-6,9,3,3,7,0,5,-3,4,-18,8,-9,18,-10,10,-3,8,3,4,6,0,12,8,2,15,-27,-2,-10,3,-28,-3,-18,3,-9,61,-13,85,2,19,-4,57,3,33,-16,11,-11,-5,-5,-21,3,0,-11,-13,-36,-3,-4,-12,-1,-7,-16,-3,-3,-12,4,-20,-12,-16,0,-4,-7,-10,-10,-7,-26,16,-55,5,-4,0,13,7,0,7,-17,11,-5,13,7,2,6,-1,18,3,7,15,14,-1,19,11,-1,11,4,4,-4,6,0,9,-36,2,-39,13,-25,14,-137,-6,-5,-3,6,-21,12,-12,-8,-3,-7,1,-9,2,-9,5,-5,6,-27,-27,38,-4,52,-10,19,-9,35,4,12,-6,-5,-11,20,-16,21,-5,9,0,8,-26,-24,-27,-4,-12,12,-20,37,2,18,-5,32,-4,-5,0,-12,-29,4,12,-9,13,-2,7,-8,1,-14,-13,-8,1,-6,7,-8,-9,-3,-3,-13,18,-39,-2,-10,-23,-21,-13,-22,-7,-1,-9,7,2,13,12,14,-25,-14,-4,10,-3,19,9,16,-10,-8,-3,-10,2,-12,-6,-19,-24,-21,-9,51,2,-37,-15,-19,-11,0,-7,6,-7,9,-5,22],
    [9115,2217,-11,-6,4,41,10,-24,-3,-11],
    [9156,2238,-5,-3,-4,3,-6,9,5,15,10,-24],
    [9078,2209,-27,-2,17,26,-3,21,-9,8,-6,22,10,2,7,-5,7,-17,13,-15,-4,-33,-5,-7],
    [9187,2183,-3,-8,-2,6,3,12,3,-5,-1,-5],
    [9195,2151,-6,-1,-3,3,0,18,7,1,2,-4,0,-17],
    [9064,2296,2,-4,-12,9,4,3,6,-8],
  ],
};

const D = Math.PI / 180;
const TAU = Math.PI * 2;

interface CompiledPolyline {
  vec: Float32Array;
  skip: Uint8Array;
  count: number;
}

function compilePolyline(raw: number[], u: number, anti: boolean): CompiledPolyline {
  const count = raw.length >> 1;
  const vec = new Float32Array(count * 3);
  const skip = new Uint8Array(count);
  let x = 0;
  let y = 0;
  let prevLon = 0;

  for (let i = 0; i < count; i++) {
    x += raw[i * 2];
    y += raw[i * 2 + 1];
    const lon = x / u;
    const lat = y / u;
    const lo = lon * D;
    const la = lat * D;
    const cosLa = Math.cos(la);
    vec[i * 3] = cosLa * Math.sin(lo);
    vec[i * 3 + 1] = cosLa * Math.cos(lo);
    vec[i * 3 + 2] = Math.sin(la);
    if (i > 0 && anti && Math.abs(lon) >= 179.9 && Math.abs(prevLon) >= 179.9) {
      skip[i] = 1;
    }
    prevLon = lon;
  }

  return { vec, skip, count };
}

function compileRawPoints(pts: [number, number][]): CompiledPolyline {
  const count = pts.length;
  const vec = new Float32Array(count * 3);
  const skip = new Uint8Array(count);
  for (let i = 0; i < count; i++) {
    const lo = pts[i][0] * D;
    const la = pts[i][1] * D;
    const cosLa = Math.cos(la);
    vec[i * 3] = cosLa * Math.sin(lo);
    vec[i * 3 + 1] = cosLa * Math.cos(lo);
    vec[i * 3 + 2] = Math.sin(la);
  }
  return { vec, skip, count };
}

/* Precompile static 3D unit-sphere vectors once at module load */
const LAND_COMPILED = GEO.land.map((r) => compilePolyline(r, 4, true));
const BD_COMPILED = GEO.bd.map((r) => compilePolyline(r, 100, false));

const GRAT_REGULAR: CompiledPolyline[] = [];
const GRAT_EQUATOR: CompiledPolyline[] = [];
for (let lo = -180; lo < 180; lo += 15) {
  const pts: [number, number][] = [];
  for (let la = -85; la <= 85; la += 5) pts.push([lo, la]);
  GRAT_REGULAR.push(compileRawPoints(pts));
}
for (let la = -75; la <= 75; la += 15) {
  const pts: [number, number][] = [];
  for (let lo = -180; lo <= 180; lo += 5) pts.push([lo, la]);
  if (la === 0) GRAT_EQUATOR.push(compileRawPoints(pts));
  else GRAT_REGULAR.push(compileRawPoints(pts));
}

/* EDIT: sample points [shape, lat, lon]. Shapes: sq Asia, ci Europe, di Africa, tu North America, td South America, cr Oceania. Replace with real Atlas locations. */
const POINTS_RAW: [string, number, number][] = [
  ['sq', 35.7, 139.7], ['sq', 28.6, 77.2], ['sq', -6.2, 106.8], ['sq', 24.7, 46.7],
  ['ci', 51.5, -0.1], ['ci', 52.5, 13.4], ['ci', 41.9, 12.5], ['ci', 40.4, -3.7],
  ['di', 30.0, 31.2], ['di', -1.3, 36.8], ['di', 9.1, 7.4], ['di', -25.7, 28.2],
  ['tu', 38.9, -77.0], ['tu', 45.4, -75.7], ['tu', 19.4, -99.1],
  ['td', -15.8, -47.9], ['td', 4.7, -74.1], ['td', -33.4, -70.7],
  ['cr', -35.3, 149.1], ['cr', -41.3, 174.8], ['cr', -18.1, 178.4],
];

const POINTS_COMPILED = POINTS_RAW.map(([kind, lat, lon]) => {
  const lo = lon * D;
  const la = lat * D;
  const cosLa = Math.cos(la);
  return {
    kind,
    ux: cosLa * Math.sin(lo),
    uy: cosLa * Math.cos(lo),
    uz: Math.sin(la),
  };
});

const DHAKA: [number, number] = [90.41, 23.81];
const DHAKA_LO = DHAKA[0] * D;
const DHAKA_LA = DHAKA[1] * D;
const DHAKA_UX = Math.cos(DHAKA_LA) * Math.sin(DHAKA_LO);
const DHAKA_UY = Math.cos(DHAKA_LA) * Math.cos(DHAKA_LO);
const DHAKA_UZ = Math.sin(DHAKA_LA);

export function Globe() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cvRef = useRef<HTMLCanvasElement | null>(null);
  const flagRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const cv = cvRef.current;
    const stage = stageRef.current;
    const flag = flagRef.current;
    const label = labelRef.current;
    if (!cv || !stage || !flag || !label || !cv.getContext) return;

    // Use a conventional opaque 2D context for consistent painting in mobile WebViews.
    const ctx = cv.getContext('2d', { alpha: false }) ?? cv.getContext('2d');
    if (!ctx) return;

    const PAPER = '#F8F7F3';
    const INK = '#0B0F19';
    const COB = '#1E40AF';
    const MUT = '#4B5563';
    const HAIR = '#D1D5DB';

    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Timeline: brisk hold on Bangladesh, zoom out, then continuous world spin */
    const HOLD = 1.1;
    const TRANS = 2.2;
    const Z0 = 2.3;
    const LAT0 = 23.8;
    const LAT1 = 18;
    const SPIN = -14;

    const st = {
      lon: DHAKA[0],
      lat: LAT0,
      zoom: reduce ? 1.35 : Z0,
      cx: 0,
      cy: 0,
      R: 1,
    };

    let W = 0;
    let H = 0;
    let dpr = 1;
    let t = 0;
    let last = 0;
    let running = false;
    let raf = 0;
    let drag = false;
    let lx = 0;
    let flagA = reduce ? 1 : 0;
    let labA = 1;

    let prevFlagTransform = '';
    let prevFlagOpacity = '';
    let prevLabelOpacity = '';

    function appendShape(k: string, x: number, y: number, s: number) {
      if (k === 'sq') {
        ctx!.rect(x - s, y - s, 2 * s, 2 * s);
      } else if (k === 'ci') {
        ctx!.moveTo(x + s * 1.1, y);
        ctx!.arc(x, y, s * 1.1, 0, TAU);
      } else if (k === 'di') {
        const d = s * 1.4;
        ctx!.moveTo(x, y - d);
        ctx!.lineTo(x + d, y);
        ctx!.lineTo(x, y + d);
        ctx!.lineTo(x - d, y);
        ctx!.closePath();
      } else if (k === 'tu') {
        const u = s * 1.2;
        ctx!.moveTo(x, y - u);
        ctx!.lineTo(x + u, y + u * 0.85);
        ctx!.lineTo(x - u, y + u * 0.85);
        ctx!.closePath();
      } else if (k === 'td') {
        const d = s * 1.2;
        ctx!.moveTo(x - d, y - d * 0.85);
        ctx!.lineTo(x + d, y - d * 0.85);
        ctx!.lineTo(x, y + d);
        ctx!.closePath();
      } else {
        const a = s * 1.3;
        const b = s * 0.45;
        ctx!.moveTo(x - b, y - a);
        ctx!.lineTo(x + b, y - a);
        ctx!.lineTo(x + b, y - b);
        ctx!.lineTo(x + a, y - b);
        ctx!.lineTo(x + a, y + b);
        ctx!.lineTo(x + b, y + b);
        ctx!.lineTo(x + b, y + a);
        ctx!.lineTo(x - b, y + a);
        ctx!.lineTo(x - b, y + b);
        ctx!.lineTo(x - a, y + b);
        ctx!.lineTo(x - a, y - b);
        ctx!.lineTo(x - b, y - b);
        ctx!.closePath();
      }
    }

    function tracePolyline(
      poly: CompiledPolyline,
      cx: number,
      cy: number,
      R: number,
      cLon: number,
      sLon: number,
      cLat: number,
      sLat: number
    ) {
      const { vec, skip, count } = poly;
      let prevOk = false;
      for (let i = 0; i < count; i++) {
        const base = i * 3;
        const ux = vec[base];
        const uy = vec[base + 1];
        const uz = vec[base + 2];
        const rx = ux * cLon - uy * sLon;
        const ry = uy * cLon + ux * sLon;
        const z = sLat * uz + cLat * ry;
        const ok = z > 0;
        if (ok) {
          const px = cx + R * rx;
          const py = cy - R * (cLat * uz - sLat * ry);
          if (prevOk && skip[i] === 0) {
            ctx!.lineTo(px, py);
          } else {
            ctx!.moveTo(px, py);
          }
        }
        prevOk = ok;
      }
    }

    function draw() {
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, W, H);
      ctx!.globalAlpha = 1;
      ctx!.fillStyle = PAPER;
      ctx!.fillRect(0, 0, W, H);

      const cx = W * 0.5;
      const cy = H * 0.5;
      const R = Math.min(W, H) * 0.46 * st.zoom;
      st.cx = cx;
      st.cy = cy;
      st.R = R;

      const lonRad = st.lon * D;
      const latRad = st.lat * D;
      const cLon = Math.cos(lonRad);
      const sLon = Math.sin(lonRad);
      const cLat = Math.cos(latRad);
      const sLat = Math.sin(latRad);

      ctx!.lineJoin = 'round';
      ctx!.lineCap = 'round';

      /* Outer globe rim */
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = INK;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, TAU);
      ctx!.stroke();

      /* Batched regular graticule */
      ctx!.lineWidth = 0.6;
      ctx!.strokeStyle = HAIR;
      ctx!.globalAlpha = 1;
      ctx!.beginPath();
      for (let i = 0; i < GRAT_REGULAR.length; i++) {
        tracePolyline(GRAT_REGULAR[i], cx, cy, R, cLon, sLon, cLat, sLat);
      }
      ctx!.stroke();

      /* Equator */
      ctx!.strokeStyle = MUT;
      ctx!.globalAlpha = 0.6;
      ctx!.beginPath();
      for (let i = 0; i < GRAT_EQUATOR.length; i++) {
        tracePolyline(GRAT_EQUATOR[i], cx, cy, R, cLon, sLon, cLat, sLat);
      }
      ctx!.stroke();

      /* Batched land outlines */
      ctx!.globalAlpha = 0.85;
      ctx!.lineWidth = 0.9;
      ctx!.strokeStyle = MUT;
      ctx!.beginPath();
      for (let i = 0; i < LAND_COMPILED.length; i++) {
        tracePolyline(LAND_COMPILED[i], cx, cy, R, cLon, sLon, cLat, sLat);
      }
      ctx!.stroke();
      ctx!.globalAlpha = 1;

      /* Bangladesh */
      ctx!.strokeStyle = COB;
      ctx!.fillStyle = COB;
      ctx!.lineWidth = 1.6;
      for (let i = 0; i < BD_COMPILED.length; i++) {
        const { vec, count } = BD_COMPILED[i];
        let all = true;
        ctx!.beginPath();
        for (let j = 0; j < count; j++) {
          const base = j * 3;
          const ux = vec[base];
          const uy = vec[base + 1];
          const uz = vec[base + 2];
          const rx = ux * cLon - uy * sLon;
          const ry = uy * cLon + ux * sLon;
          const z = sLat * uz + cLat * ry;
          if (z <= 0) all = false;
          const px = cx + R * rx;
          const py = cy - R * (cLat * uz - sLat * ry);
          if (j) ctx!.lineTo(px, py);
          else ctx!.moveTo(px, py);
        }
        if (all) {
          ctx!.closePath();
          ctx!.globalAlpha = 0.28;
          ctx!.fill();
          ctx!.globalAlpha = 1;
          ctx!.stroke();
        }
      }

      /* Points (batched for opaque interior, individual only on limb fade) */
      const ptSize = Math.max(3, Math.min(5, R / 60));
      ctx!.fillStyle = INK;
      ctx!.globalAlpha = 1;
      ctx!.beginPath();
      let hasFull = false;
      for (let i = 0; i < POINTS_COMPILED.length; i++) {
        const pt = POINTS_COMPILED[i];
        const rx = pt.ux * cLon - pt.uy * sLon;
        const ry = pt.uy * cLon + pt.ux * sLon;
        const z = sLat * pt.uz + cLat * ry;
        if (z >= 0.25) {
          const px = cx + R * rx;
          const py = cy - R * (cLat * pt.uz - sLat * ry);
          appendShape(pt.kind, px, py, ptSize);
          hasFull = true;
        }
      }
      if (hasFull) ctx!.fill();

      for (let i = 0; i < POINTS_COMPILED.length; i++) {
        const pt = POINTS_COMPILED[i];
        const rx = pt.ux * cLon - pt.uy * sLon;
        const ry = pt.uy * cLon + pt.ux * sLon;
        const z = sLat * pt.uz + cLat * ry;
        if (z > 0.05 && z < 0.25) {
          const px = cx + R * rx;
          const py = cy - R * (cLat * pt.uz - sLat * ry);
          ctx!.globalAlpha = z * 4;
          ctx!.beginPath();
          appendShape(pt.kind, px, py, ptSize);
          ctx!.fill();
        }
      }
      ctx!.globalAlpha = 1;

      /* Dhaka marker + flag pin */
      const drx = DHAKA_UX * cLon - DHAKA_UY * sLon;
      const dry = DHAKA_UY * cLon + DHAKA_UX * sLon;
      const dz = sLat * DHAKA_UZ + cLat * dry;
      const dpx = cx + R * drx;
      const dpy = cy - R * (cLat * DHAKA_UZ - sLat * dry);

      if (dz > 0.05) {
        ctx!.fillStyle = COB;
        ctx!.fillRect(dpx - 3, dpy - 3, 6, 6);
      }

      const c = dz > 0.12 ? Math.min(1, (dz - 0.12) * 5) * flagA : 0;
      const nextTransform =
        'translate3d(' + dpx.toFixed(1) + 'px,' + dpy.toFixed(1) + 'px,0)';
      const nextOpacity = c.toFixed(2);
      const nextLabOpacity = labA.toFixed(2);

      if (nextTransform !== prevFlagTransform) {
        flag!.style.transform = nextTransform;
        prevFlagTransform = nextTransform;
      }
      if (nextOpacity !== prevFlagOpacity) {
        flag!.style.opacity = nextOpacity;
        prevFlagOpacity = nextOpacity;
      }
      if (nextLabOpacity !== prevLabelOpacity) {
        label!.style.opacity = nextLabOpacity;
        prevLabelOpacity = nextLabOpacity;
      }
    }

    function size(forceRedraw = false) {
      const r = stage!.getBoundingClientRect();
      const nextW = Math.max(1, r.width);
      const nextH = Math.max(1, r.height);
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const targetW = Math.round(nextW * nextDpr);
      const targetH = Math.round(nextH * nextDpr);

      if (
        nextW === W &&
        nextH === H &&
        nextDpr === dpr &&
        cv!.width === targetW &&
        cv!.height === targetH
      ) {
        if (forceRedraw) draw();
        return;
      }

      W = nextW;
      H = nextH;
      dpr = nextDpr;
      cv!.width = targetW;
      cv!.height = targetH;
      draw();
    }

    function ease(x: number) {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    function clamp(x: number) {
      return x < 0 ? 0 : x > 1 ? 1 : x;
    }

    function tick(ts: number) {
      if (!running) return;
      if (!last) last = ts;
      const dt = Math.min(0.05, (ts - last) / 1000);
      last = ts;
      t += dt;
      const p = t < HOLD ? 0 : clamp((t - HOLD) / TRANS);
      const e = ease(p);
      st.zoom = Z0 + (1 - Z0) * e;
      st.lat = LAT0 + (LAT1 - LAT0) * e;
      if (!drag) st.lon += SPIN * e * dt;
      flagA = clamp(t / 0.5);
      labA = 1 - clamp((p - 0.1) / 0.4);
      draw();
      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (running || reduce) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    let dragRaf = 0;
    const scheduleDragDraw = () => {
      if (running || dragRaf) return;
      dragRaf = requestAnimationFrame(() => {
        dragRaf = 0;
        draw();
      });
    };

    /* drag to rotate (horizontal); vertical swipes still scroll the page */
    const onPointerDown = (e: PointerEvent) => {
      drag = true;
      lx = e.clientX;
      cv.classList.add('atl-drag');
      try {
        cv.setPointerCapture(e.pointerId);
      } catch {
        // ignore capture errors
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!drag) return;
      st.lon -= ((e.clientX - lx) / st.R) * 57.2958;
      lx = e.clientX;
      if (!running) scheduleDragDraw();
    };
    const onPointerEnd = () => {
      drag = false;
      cv.classList.remove('atl-drag');
    };

    cv.addEventListener('pointerdown', onPointerDown);
    cv.addEventListener('pointermove', onPointerMove);
    cv.addEventListener('pointerup', onPointerEnd);
    cv.addEventListener('pointercancel', onPointerEnd);

    const onDprChange = () => size(true);
    const onPageResume = () => size(true);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => size());
      ro.observe(stage);
    }
    size();

    let io: IntersectionObserver | null = null;
    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        size(true);
        const r = stage.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) start();
      }
    };

    window.addEventListener('resize', onDprChange, { passive: true });
    window.addEventListener('pageshow', onPageResume);
    window.addEventListener('focus', onPageResume);
    window.visualViewport?.addEventListener('resize', onPageResume);
    document.addEventListener('visibilitychange', onVisibilityChange);
    cv.addEventListener('contextrestored', onPageResume);

    if (reduce) {
      flagA = 1;
      labA = 1;
      draw();
    } else {
      if (typeof IntersectionObserver !== 'undefined') {
        io = new IntersectionObserver(
          (en) => {
            if (en[0].isIntersecting) start();
            else stop();
          },
          { threshold: 0.1 }
        );
        io.observe(stage);
      } else {
        start();
      }
    }

    return () => {
      stop();
      if (dragRaf) cancelAnimationFrame(dragRaf);
      cv.removeEventListener('pointerdown', onPointerDown);
      cv.removeEventListener('pointermove', onPointerMove);
      cv.removeEventListener('pointerup', onPointerEnd);
      cv.removeEventListener('pointercancel', onPointerEnd);
      window.removeEventListener('resize', onDprChange);
      window.removeEventListener('pageshow', onPageResume);
      window.removeEventListener('focus', onPageResume);
      window.visualViewport?.removeEventListener('resize', onPageResume);
      cv.removeEventListener('contextrestored', onPageResume);
      if (ro) ro.disconnect();
      if (io) io.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <section className="atl-globe" aria-labelledby="atl-globe-h">
      <div className="atlas-container">
        <h2 className="sr-only" id="atl-globe-h">
          World regions
        </h2>
        <figure className="atl-globe-fig">
          <div className="atl-globe-stage" id="atl-globe-stage" ref={stageRef}>
            <canvas
              id="atl-globe-canvas"
              ref={cvRef}
              role="img"
              aria-label="Globe that starts on Bangladesh, then zooms out and rotates to show the world regions: Asia, Europe, Africa, North America, South America and Oceania."
            >
              Globe centred on Bangladesh, then rotating across Asia, Europe,
              Africa, North America, South America and Oceania.
            </canvas>
            <div
              className="atl-globe-flag"
              id="atl-globe-flag"
              ref={flagRef}
              aria-hidden="true"
            >
              <svg
                className="atl-flag"
                viewBox="0 0 32 40"
                width="32"
                height="40"
                focusable="false"
              >
                <rect x="0" y="0" width="2" height="40" fill="#0B0F19" />
                <rect x="2" y="0" width="30" height="18" fill="#006A4E" />
                <circle cx="15.5" cy="9" r="5.4" fill="#F42A41" />
              </svg>
              <span
                className="atl-mono atl-flag-label"
                id="atl-globe-label"
                ref={labelRef}
              >
                Bangladesh
              </span>
            </div>
          </div>
        </figure>
        <ul className="atl-regions">
          <li>
            <svg viewBox="0 0 14 14" aria-hidden="true">
              <rect x="2" y="2" width="10" height="10" />
            </svg>
            Asia
          </li>
          <li>
            <svg viewBox="0 0 14 14" aria-hidden="true">
              <circle cx="7" cy="7" r="5.5" />
            </svg>
            Europe
          </li>
          <li>
            <svg viewBox="0 0 14 14" aria-hidden="true">
              <path d="M7 .5L13.5 7 7 13.5.5 7z" />
            </svg>
            Africa
          </li>
          <li>
            <svg viewBox="0 0 14 14" aria-hidden="true">
              <path d="M7 1.5L13 12.5H1z" />
            </svg>
            North America
          </li>
          <li>
            <svg viewBox="0 0 14 14" aria-hidden="true">
              <path d="M1 1.5H13L7 12.5z" />
            </svg>
            South America
          </li>
          <li>
            <svg viewBox="0 0 14 14" aria-hidden="true">
              <path d="M5.2 1H8.8V5.2H13V8.8H8.8V13H5.2V8.8H1V5.2H5.2z" />
            </svg>
            Oceania
          </li>
        </ul>
      </div>
    </section>
  );
}
