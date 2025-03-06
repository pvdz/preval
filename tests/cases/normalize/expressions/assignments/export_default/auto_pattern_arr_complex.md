# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > Export default > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
export default [a] = $([1, 2]);
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
const tmpAnonDefaultExport = ([a] = $([1, 2]));
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let tmpAnonDefaultExport = undefined;
const tmpCalleeParam = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
tmpAnonDefaultExport = tmpNestedAssignArrPatternRhs;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
arrPatternSplat[0];
let tmpAnonDefaultExport /*:unknown*/ = undefined;
const tmpCalleeParam /*:array*/ = [1, 2];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_a /*:unknown*/ = arrPatternSplat$1[0];
tmpAnonDefaultExport = tmpNestedAssignArrPatternRhs;
export { tmpAnonDefaultExport as default };
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ ...a ];
b[ 0 ];
let c = undefined;
const d = [ 1, 2 ];
const e = $( d );
const f = [ ...e ];
const g = f[ 0 ];
c = e;
export { c as default };
$( g );
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