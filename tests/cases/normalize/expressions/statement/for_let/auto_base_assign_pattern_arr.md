# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > For let > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
for (let xyz = ([b] = $([$(2)])); ; $(1)) $(xyz);
$(a, b);
`````

## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam /*:array*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
arrPatternSplat[0];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpNestedAssignArrPatternRhs);
  $(1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(2);
const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
[...tmpNestedAssignArrPatternRhs][0];
while (true) {
  $(tmpNestedAssignArrPatternRhs);
  $(1);
}
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
{
  let xyz = ([b] = $([$(2)]));
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let xyz = undefined;
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
xyz = tmpNestedAssignArrPatternRhs;
while (true) {
  $(xyz);
  $(1);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ a ];
const c = $( b );
const d = [ ...c ];
d[ 0 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( c );
  $( 1 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: [2]
 - 4: 1
 - 5: [2]
 - 6: 1
 - 7: [2]
 - 8: 1
 - 9: [2]
 - 10: 1
 - 11: [2]
 - 12: 1
 - 13: [2]
 - 14: 1
 - 15: [2]
 - 16: 1
 - 17: [2]
 - 18: 1
 - 19: [2]
 - 20: 1
 - 21: [2]
 - 22: 1
 - 23: [2]
 - 24: 1
 - 25: [2]
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
