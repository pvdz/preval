# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Assignments > While > Auto ident object complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = { x: $(1), y: 2, z: $(3) })) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = { x: $(1), y: 2, z: $(3) })) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$1 = 2;
  const tmpObjLitVal$3 = $(3);
  a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$3 = $(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
  $(3);
  $(100);
}
const a = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
$( 100 );
$( 1 );
$( 3 );
$( 100 );
$( 1 );
$( 3 );
$( 100 );
$( 1 );
$( 3 );
$( 100 );
$( 1 );
$( 3 );
$( 100 );
$( 1 );
$( 3 );
$( 100 );
$( 1 );
$( 3 );
$( 100 );
$( 1 );
$( 3 );
$( 100 );
$( 1 );
$( 3 );
$( 100 );
$( 1 );
$( 3 );
$( 100 );
$( 1 );
$( 3 );
$( 100 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
  $( 3 );
  $( 100 );
}
const c = {
x: a,
y: 2,
z: b
;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 100
 - 4: 1
 - 5: 3
 - 6: 100
 - 7: 1
 - 8: 3
 - 9: 100
 - 10: 1
 - 11: 3
 - 12: 100
 - 13: 1
 - 14: 3
 - 15: 100
 - 16: 1
 - 17: 3
 - 18: 100
 - 19: 1
 - 20: 3
 - 21: 100
 - 22: 1
 - 23: 3
 - 24: 100
 - 25: 1
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
