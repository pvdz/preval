# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > Export default > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
export default [a] = ($(10), $(20), $([1, 2]));
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
const tmpAnonDefaultExport = ([a] = ($(10), $(20), $([1, 2])));
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let tmpAnonDefaultExport = undefined;
$(10);
$(20);
const tmpCallCallee = $;
const tmpCalleeParam = [1, 2];
const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
tmpAnonDefaultExport = tmpNestedAssignArrPatternRhs;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output


`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
arrPatternSplat[0];
let tmpAnonDefaultExport = undefined;
$(10);
$(20);
const tmpCalleeParam = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_a = arrPatternSplat$1[0];
tmpAnonDefaultExport = tmpNestedAssignArrPatternRhs;
export { tmpAnonDefaultExport as default };
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = [ ... a ];
b[ 0 ];
let c = undefined;
$( 10 );
$( 20 );
const d = [ 1, 2 ];
const e = $( d );
const f = [ ... e ];
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
