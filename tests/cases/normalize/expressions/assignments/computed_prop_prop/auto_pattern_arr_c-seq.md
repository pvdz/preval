# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
let obj = {};
obj[([a] = ($(10), $(20), $([1, 2])))];
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
let obj = {};
obj[([a] = ($(10), $(20), $([1, 2])))];
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let obj = {};
const tmpCompObj = obj;
let tmpCompProp = undefined;
$(10);
$(20);
const tmpCallCallee = $;
const tmpCalleeParam = [1, 2];
const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
tmpCompProp = tmpNestedAssignArrPatternRhs;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output


`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
arrPatternSplat[0];
const obj = {};
$(10);
$(20);
const tmpCalleeParam = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_a = arrPatternSplat$1[0];
obj[tmpNestedAssignArrPatternRhs];
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ ... a ];
b[ 0 ];
const c = {};
$( 10 );
$( 20 );
const d = [ 1, 2 ];
const e = $( d );
const f = [ ... e ];
const g = f[ 0 ];
c[ e ];
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
