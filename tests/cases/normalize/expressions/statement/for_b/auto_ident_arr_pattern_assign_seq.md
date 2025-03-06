# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Statement > For b > Auto ident arr pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (; ([x, y] = ($(x), $(y), [$(3), $(4)])); $(1));
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
{
  while (([x, y] = ($(x), $(y), [$(3), $(4)]))) {
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
while (true) {
  let tmpIfTest = undefined;
  $(x);
  $(y);
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  tmpIfTest = tmpNestedAssignArrPatternRhs;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, x, y);
`````

## Output


`````js filename=intro
let x /*:unknown*/ = 1;
let y /*:unknown*/ = 2;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(x);
  $(y);
  const tmpArrElement /*:unknown*/ = $(3);
  const tmpArrElement$1 /*:unknown*/ = $(4);
  x = tmpArrElement;
  y = tmpArrElement$1;
  $(1);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
let b = 2;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( a );
  $( b );
  const c = $( 3 );
  const d = $( 4 );
  a = c;
  b = d;
  $( 1 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 1
 - 6: 3
 - 7: 4
 - 8: 3
 - 9: 4
 - 10: 1
 - 11: 3
 - 12: 4
 - 13: 3
 - 14: 4
 - 15: 1
 - 16: 3
 - 17: 4
 - 18: 3
 - 19: 4
 - 20: 1
 - 21: 3
 - 22: 4
 - 23: 3
 - 24: 4
 - 25: 1
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope