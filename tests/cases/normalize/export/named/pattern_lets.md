# Preval test case

# pattern_lets.md

> Normalize > Export > Named > Pattern lets
>
> Exporting declarations

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
const tmpArrElement$3 = { c: tmpObjLitVal };
let bindingPatternArrRoot = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
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
const a /*:number*/ = 1;
const b /*:number*/ = 2;
const d /*:number*/ = 3;
export { a, b, d };
$(1, 2, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 1;
const b = 2;
const c = 3;
export { a as a,b as b,c as d };
$( 1, 2, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope