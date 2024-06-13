# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Logic and right > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$($(100) && (a = [b] = $([$(2)])));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
$($(100) && (a = [b] = $([$(2)])));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpCallCallee$1 = $;
  const tmpArrElement = $(2);
  const tmpCalleeParam$1 = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpArrElement = $(2);
  const tmpCalleeParam$1 = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  a = tmpNestedAssignArrPatternRhs;
  $(tmpNestedAssignArrPatternRhs);
} else {
  $(tmpCalleeParam);
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = [];
let b = {
  a: 999,
  b: 1000,
};
const c = $( 100 );
if (c) {
  const d = $( 2 );
  const e = [ d ];
  const f = $( e );
  const g = [ ... f ];
  a = g[ 0 ];
  b = f;
  $( f );
}
else {
  $( c );
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: [2]
 - 4: [2]
 - 5: [2], 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
