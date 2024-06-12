# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Statement > For b > Auto ident arr pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

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
$(1);
$(2);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
$(1);
$(tmpArrElement);
$(tmpArrElement$1);
const tmpArrElement$2 = $(3);
const tmpArrElement$4 = $(4);
let tmpClusterSSA_x = tmpArrElement$2;
let tmpClusterSSA_y$1 = tmpArrElement$4;
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpClusterSSA_x);
  $(tmpClusterSSA_y$1);
  const tmpArrElement$3 = $(3);
  const tmpArrElement$5 = $(4);
  tmpClusterSSA_x = tmpArrElement$3;
  tmpClusterSSA_y$1 = tmpArrElement$5;
  $(1);
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 3 );
const b = $( 4 );
$( 1 );
$( a );
$( b );
const c = $( 3 );
const d = $( 4 );
let e = c;
let f = d;
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( e );
  $( f );
  const g = $( 3 );
  const h = $( 4 );
  e = g;
  f = h;
  $( 1 );
}
throw "[preval] unreachable; infinite loop";
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
