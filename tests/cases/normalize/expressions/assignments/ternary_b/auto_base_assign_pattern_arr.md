# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Ternary b > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$($(1) ? (a = [b] = $([$(2)])) : $(200));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
$($(1) ? (a = [b] = $([$(2)])) : $(200));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
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
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpArrElement = $(2);
  const tmpCalleeParam$1 = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  a = tmpNestedAssignArrPatternRhs;
  tmpCalleeParam = tmpNestedAssignArrPatternRhs;
  $(tmpNestedAssignArrPatternRhs);
} else {
  tmpCalleeParam = $(200);
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
b: 1000
;
let c = undefined;
const d = $( 1 );
if (d) {
  const e = $( 2 );
  const f = [ e ];
  const g = $( f );
  const h = [ ... g ];
  a = h[ 0 ];
  b = g;
  c = g;
  $( g );
}
else {
  c = $( 200 );
  $( c );
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: [2]
 - 4: [2]
 - 5: [2], 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
