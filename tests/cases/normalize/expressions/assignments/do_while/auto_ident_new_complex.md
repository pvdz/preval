# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident new complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = new ($($))(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = new ($($))(1))) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpNewCallee = $($);
  a = new tmpNewCallee(1);
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
$(100);
const tmpNewCallee = $($);
const a = new tmpNewCallee(1);
$(100);
const tmpNewCallee$1 = $($);
new tmpNewCallee$1(1);
$(100);
const tmpNewCallee$2 = $($);
new tmpNewCallee$2(1);
$(100);
const tmpNewCallee$3 = $($);
new tmpNewCallee$3(1);
$(100);
const tmpNewCallee$4 = $($);
new tmpNewCallee$4(1);
$(100);
const tmpNewCallee$5 = $($);
new tmpNewCallee$5(1);
$(100);
const tmpNewCallee$6 = $($);
new tmpNewCallee$6(1);
$(100);
const tmpNewCallee$7 = $($);
new tmpNewCallee$7(1);
$(100);
const tmpNewCallee$8 = $($);
new tmpNewCallee$8(1);
$(100);
const tmpNewCallee$9 = $($);
new tmpNewCallee$9(1);
$(100);
const tmpNewCallee$10 = $($);
new tmpNewCallee$10(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpNewCallee$11 = $($);
  new tmpNewCallee$11(1);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = $( $ );
const b = new a( 1 );
$( 100 );
const c = $( $ );
new c( 1 );
$( 100 );
const d = $( $ );
new d( 1 );
$( 100 );
const e = $( $ );
new e( 1 );
$( 100 );
const f = $( $ );
new f( 1 );
$( 100 );
const g = $( $ );
new g( 1 );
$( 100 );
const h = $( $ );
new h( 1 );
$( 100 );
const i = $( $ );
new i( 1 );
$( 100 );
const j = $( $ );
new j( 1 );
$( 100 );
const k = $( $ );
new k( 1 );
$( 100 );
const l = $( $ );
new l( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const m = $( $ );
  new m( 1 );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: '<$>'
 - 3: 1
 - 4: 100
 - 5: '<$>'
 - 6: 1
 - 7: 100
 - 8: '<$>'
 - 9: 1
 - 10: 100
 - 11: '<$>'
 - 12: 1
 - 13: 100
 - 14: '<$>'
 - 15: 1
 - 16: 100
 - 17: '<$>'
 - 18: 1
 - 19: 100
 - 20: '<$>'
 - 21: 1
 - 22: 100
 - 23: '<$>'
 - 24: 1
 - 25: 100
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
