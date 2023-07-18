# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Export default > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
export default [b] = $([$(2)]);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = ([b] = $([$(2)]));
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let tmpAnonDefaultExport = undefined;
const tmpCallCallee = $;
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
tmpAnonDefaultExport = tmpNestedAssignArrPatternRhs;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpAnonDefaultExport = undefined;
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_b = arrPatternSplat[0];
tmpAnonDefaultExport = tmpNestedAssignArrPatternRhs;
export { tmpAnonDefaultExport as default };
$(a, tmpClusterSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
let b = undefined;
const c = $( 2 );
const d = [ c,, ];
const e = $( d );
const f = [ ... e,, ];
const g = f[ 0 ];
b = e;
export { b as default from "undefined"
$( a, g );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
