# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Statement > Do while > Auto ident obj pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (({ x, y } = ($(x), $(y), { x: $(3), y: $(4) })));
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if (({ x: x, y: y } = ($(x), $(y), { x: $(3), y: $(4) }))) {
  } else {
    break;
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
  $(100);
  let tmpIfTest = undefined;
  $(x);
  $(y);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  tmpIfTest = tmpNestedAssignObjPatternRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, x, y);
`````

## Output


`````js filename=intro
$(100);
$(1);
$(2);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
let tmpClusterSSA_x = tmpObjLitVal;
let tmpClusterSSA_y = tmpObjLitVal$1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  $(tmpClusterSSA_x);
  $(tmpClusterSSA_y);
  const tmpObjLitVal$2 = $(3);
  const tmpObjLitVal$4 = $(4);
  tmpClusterSSA_x = tmpObjLitVal$2;
  tmpClusterSSA_y = tmpObjLitVal$4;
}
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
$( 1 );
$( 2 );
const a = $( 3 );
const b = $( 4 );
let c = a;
let d = b;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  $( c );
  $( d );
  const e = $( 3 );
  const f = $( 4 );
  c = e;
  d = f;
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: 100
 - 7: 3
 - 8: 4
 - 9: 3
 - 10: 4
 - 11: 100
 - 12: 3
 - 13: 4
 - 14: 3
 - 15: 4
 - 16: 100
 - 17: 3
 - 18: 4
 - 19: 3
 - 20: 4
 - 21: 100
 - 22: 3
 - 23: 4
 - 24: 3
 - 25: 4
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
