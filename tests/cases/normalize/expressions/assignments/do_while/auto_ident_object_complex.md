# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident object complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = { x: $(1), y: 2, z: $(3) }));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = { x: $(1), y: 2, z: $(3) };
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpObjLitVal = $(1);
    const tmpObjLitVal$1 = 2;
    const tmpObjLitVal$3 = $(3);
    const tmpNestedComplexRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
    a = tmpNestedComplexRhs;
    tmpDoWhileFlag = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
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
const tmpObjLitVal$1 = $(1);
const tmpObjLitVal$4 = $(3);
const tmpNestedComplexRhs$1 = { x: tmpObjLitVal$1, y: 2, z: tmpObjLitVal$4 };
let tmpSSA_a$2 = tmpNestedComplexRhs$1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpObjLitVal$2 = $(1);
  const tmpObjLitVal$5 = $(3);
  const tmpNestedComplexRhs$2 = { x: tmpObjLitVal$2, y: 2, z: tmpObjLitVal$5 };
  tmpSSA_a$2 = tmpNestedComplexRhs$2;
}
$(tmpSSA_a$2);
`````

## PST Output

With rename=true

`````js filename=intro
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
const a = $( 1 );
const b = $( 3 );
const c = {
x: a,
y: 2,
z: b
;
let d = c;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const e = $( 1 );
  const f = $( 3 );
  const g = {
x: e,
y: 2,
z: f
  ;
  d = g;
}
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 3
 - 4: 100
 - 5: 1
 - 6: 3
 - 7: 100
 - 8: 1
 - 9: 3
 - 10: 100
 - 11: 1
 - 12: 3
 - 13: 100
 - 14: 1
 - 15: 3
 - 16: 100
 - 17: 1
 - 18: 3
 - 19: 100
 - 20: 1
 - 21: 3
 - 22: 100
 - 23: 1
 - 24: 3
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
