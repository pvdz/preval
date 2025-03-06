# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Assignments > For let > Auto ident arr pattern assign
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (let xyz = (a = [x, y] = [$(3), $(4)]); ; $(1)) $(xyz);
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
{
  let xyz = (a = [x, y] = [$(3), $(4)]);
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
a = tmpNestedAssignArrPatternRhs;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
`````

## Output


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(3);
const tmpArrElement$1 /*:unknown*/ = $(4);
const tmpNestedAssignArrPatternRhs /*:array*/ = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
arrPatternSplat[0];
arrPatternSplat[1];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpNestedAssignArrPatternRhs);
  $(1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
const c = [ a, b ];
const d = [ ...c ];
d[ 0 ];
d[ 1 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( c );
  $( 1 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: [3, 4]
 - 4: 1
 - 5: [3, 4]
 - 6: 1
 - 7: [3, 4]
 - 8: 1
 - 9: [3, 4]
 - 10: 1
 - 11: [3, 4]
 - 12: 1
 - 13: [3, 4]
 - 14: 1
 - 15: [3, 4]
 - 16: 1
 - 17: [3, 4]
 - 18: 1
 - 19: [3, 4]
 - 20: 1
 - 21: [3, 4]
 - 22: 1
 - 23: [3, 4]
 - 24: 1
 - 25: [3, 4]
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope