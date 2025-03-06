# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$({ [([a] = ($(10), $(20), $([1, 2])))]: 10 });
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
$({ [([a] = ($(10), $(20), $([1, 2])))]: 10 });
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let tmpObjLitPropKey = undefined;
$(10);
$(20);
const tmpCalleeParam$1 = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
tmpObjLitPropKey = tmpNestedAssignArrPatternRhs;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
$(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
arrPatternSplat[0];
$(10);
$(20);
const tmpCalleeParam$1 /*:array*/ = [1, 2];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
const arrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_a /*:unknown*/ = arrPatternSplat$1[0];
const tmpCalleeParam /*:object*/ = { [tmpNestedAssignArrPatternRhs]: 10 };
$(tmpCalleeParam);
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
$( 10 );
$( 20 );
const c = [ 1, 2 ];
const d = $( c );
const e = [ ...d ];
const f = e[ 0 ];
const g = { [ d ]: 10 };
$( g );
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope