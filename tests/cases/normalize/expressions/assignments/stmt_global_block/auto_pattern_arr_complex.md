# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > Stmt global block > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
{
  let [a] = { a: 999, b: 1000 };
  [a] = $([1, 2]);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
{
  let [a] = { a: 999, b: 1000 };
  [a] = $([1, 2]);
  $(a);
}
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCalleeParam = [1, 2];
const arrAssignPatternRhs = $(tmpCalleeParam);
const arrPatternSplat$1 = [...arrAssignPatternRhs];
a = arrPatternSplat$1[0];
$(a);
`````

## Output


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
arrPatternSplat[0];
const tmpCalleeParam /*:array*/ = [1, 2];
const arrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat$1 /*:array*/ = [...arrAssignPatternRhs];
const tmpClusterSSA_a /*:unknown*/ = arrPatternSplat$1[0];
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
const c = [ 1, 2 ];
const d = $( c );
const e = [ ...d ];
const f = e[ 0 ];
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