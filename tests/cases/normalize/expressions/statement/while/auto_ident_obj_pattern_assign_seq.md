# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Statement > While > Auto ident obj pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
while (({ x, y } = ($(x), $(y), { x: $(3), y: $(4) }))) $(100);
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
while (({ x: x, y: y } = ($(x), $(y), { x: $(3), y: $(4) }))) $(100);
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
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  tmpIfTest = tmpNestedAssignObjPatternRhs;
  if (tmpIfTest) {
    $(100);
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
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
let x = tmpObjLitVal;
let y = tmpObjLitVal$1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  $(x);
  $(y);
  const tmpObjLitVal$2 = $(3);
  const tmpObjLitVal$4 = $(4);
  x = tmpObjLitVal$2;
  y = tmpObjLitVal$4;
}
`````

## PST Output

With rename=true

`````js filename=intro
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
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 100
 - 6: 3
 - 7: 4
 - 8: 3
 - 9: 4
 - 10: 100
 - 11: 3
 - 12: 4
 - 13: 3
 - 14: 4
 - 15: 100
 - 16: 3
 - 17: 4
 - 18: 3
 - 19: 4
 - 20: 100
 - 21: 3
 - 22: 4
 - 23: 3
 - 24: 4
 - 25: 100
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
