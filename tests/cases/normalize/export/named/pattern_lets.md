# Preval test case

# pattern_lets.md

> Normalize > Export > Named > Pattern lets
>
> Exporting declarations

#TODO

## Input

`````js filename=intro
export let [a, b, {c: [d]}] = [1, 2, {c: [3]}];
$(a, b, d);
`````

## Pre Normal

`````js filename=intro
let [
  a,
  b,
  {
    c: [d],
  },
] = [1, 2, { c: [3] }];
export { a, b, d };
$(a, b, d);
`````

## Normalized

`````js filename=intro
const tmpArrElement = 1;
const tmpArrElement$1 = 2;
const tmpObjLitVal = [3];
const tmpArrElement$2 = { c: tmpObjLitVal };
let bindingPatternArrRoot = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let b = arrPatternSplat[1];
let arrPatternStep = arrPatternSplat[2];
let objPatternNoDefault = arrPatternStep.c;
let arrPatternSplat$1 = [...objPatternNoDefault];
let d = arrPatternSplat$1[0];
export { a, b, d };
$(a, b, d);
`````

## Output

`````js filename=intro
const tmpObjLitVal = [3];
const tmpArrElement$2 = { c: tmpObjLitVal };
const bindingPatternArrRoot = [1, 2, tmpArrElement$2];
const arrPatternSplat = [...bindingPatternArrRoot];
const a = arrPatternSplat[0];
const b = arrPatternSplat[1];
const arrPatternStep = arrPatternSplat[2];
const objPatternNoDefault = arrPatternStep.c;
const arrPatternSplat$1 = [...objPatternNoDefault];
const d = arrPatternSplat$1[0];
export { a, b, d };
$(a, b, d);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
