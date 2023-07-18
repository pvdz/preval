# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Statement > While > Auto ident new complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while (new ($($))(1)) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
while (new ($($))(1)) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpNewCallee = $($);
  const tmpIfTest = new tmpNewCallee(1);
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
const tmpNewCallee = $($);
new tmpNewCallee(1);
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
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpNewCallee$11 = $($);
  new tmpNewCallee$11(1);
  $(100);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
new a( 1 );
$( 100 );
const b = $( $ );
new b( 1 );
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
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const l = $( $ );
  new l( 1 );
  $( 100 );
}
const m = {
a: 999,
b: 1000
;
$( m );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 100
 - 4: '<$>'
 - 5: 1
 - 6: 100
 - 7: '<$>'
 - 8: 1
 - 9: 100
 - 10: '<$>'
 - 11: 1
 - 12: 100
 - 13: '<$>'
 - 14: 1
 - 15: 100
 - 16: '<$>'
 - 17: 1
 - 18: 100
 - 19: '<$>'
 - 20: 1
 - 21: 100
 - 22: '<$>'
 - 23: 1
 - 24: 100
 - 25: '<$>'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
