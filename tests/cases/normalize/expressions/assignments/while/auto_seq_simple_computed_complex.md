# Preval test case

# auto_seq_simple_computed_complex.md

> Normalize > Expressions > Assignments > While > Auto seq simple computed complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = { b: $(1) })) $(100);
($(1), a)[$("b")] = $(2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = { b: $(1) })) $(100);
($(1), a)[$(`b`)] = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(1);
const tmpAssignComMemLhsObj = a;
const tmpAssignComMemLhsProp = $(`b`);
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a);
`````

## Output

`````js filename=intro
$(1);
$(100);
$(1);
$(100);
$(1);
$(100);
$(1);
$(100);
$(1);
$(100);
$(1);
$(100);
$(1);
$(100);
$(1);
$(100);
$(1);
$(100);
$(1);
$(100);
const tmpObjLitVal$1 = $(1);
let a = { b: tmpObjLitVal$1 };
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpObjLitVal$2 = $(1);
  a = { b: tmpObjLitVal$2 };
  $(100);
}
$(1);
const tmpAssignComMemLhsObj = a;
const tmpAssignComMemLhsProp = $(`b`);
const tmpAssignComputedRhs = $(2);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 100 );
$( 1 );
$( 100 );
$( 1 );
$( 100 );
$( 1 );
$( 100 );
$( 1 );
$( 100 );
$( 1 );
$( 100 );
$( 1 );
$( 100 );
$( 1 );
$( 100 );
$( 1 );
$( 100 );
$( 1 );
$( 100 );
const a = $( 1 );
let b = { b: a };
$( 100 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = $( 1 );
  b = { b: c };
  $( 100 );
}
$( 1 );
const d = b;
const e = $( "b" );
const f = $( 2 );
d[e] = f;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 100
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 100
 - 13: 1
 - 14: 100
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 100
 - 19: 1
 - 20: 100
 - 21: 1
 - 22: 100
 - 23: 1
 - 24: 100
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
