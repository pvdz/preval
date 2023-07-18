# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Statement > For b > Auto ident new complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; new ($($))(1); $(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while (new ($($))(1)) {
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpNewCallee = $($);
  const tmpIfTest = new tmpNewCallee(1);
  if (tmpIfTest) {
    $(1);
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
$(1);
const tmpNewCallee$1 = $($);
new tmpNewCallee$1(1);
$(1);
const tmpNewCallee$2 = $($);
new tmpNewCallee$2(1);
$(1);
const tmpNewCallee$3 = $($);
new tmpNewCallee$3(1);
$(1);
const tmpNewCallee$4 = $($);
new tmpNewCallee$4(1);
$(1);
const tmpNewCallee$5 = $($);
new tmpNewCallee$5(1);
$(1);
const tmpNewCallee$6 = $($);
new tmpNewCallee$6(1);
$(1);
const tmpNewCallee$7 = $($);
new tmpNewCallee$7(1);
$(1);
const tmpNewCallee$8 = $($);
new tmpNewCallee$8(1);
$(1);
const tmpNewCallee$9 = $($);
new tmpNewCallee$9(1);
$(1);
const tmpNewCallee$10 = $($);
new tmpNewCallee$10(1);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpNewCallee$11 = $($);
  new tmpNewCallee$11(1);
  $(1);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
new a( 1 );
$( 1 );
const b = $( $ );
new b( 1 );
$( 1 );
const c = $( $ );
new c( 1 );
$( 1 );
const d = $( $ );
new d( 1 );
$( 1 );
const e = $( $ );
new e( 1 );
$( 1 );
const f = $( $ );
new f( 1 );
$( 1 );
const g = $( $ );
new g( 1 );
$( 1 );
const h = $( $ );
new h( 1 );
$( 1 );
const i = $( $ );
new i( 1 );
$( 1 );
const j = $( $ );
new j( 1 );
$( 1 );
const k = $( $ );
new k( 1 );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const l = $( $ );
  new l( 1 );
  $( 1 );
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
 - 3: 1
 - 4: '<$>'
 - 5: 1
 - 6: 1
 - 7: '<$>'
 - 8: 1
 - 9: 1
 - 10: '<$>'
 - 11: 1
 - 12: 1
 - 13: '<$>'
 - 14: 1
 - 15: 1
 - 16: '<$>'
 - 17: 1
 - 18: 1
 - 19: '<$>'
 - 20: 1
 - 21: 1
 - 22: '<$>'
 - 23: 1
 - 24: 1
 - 25: '<$>'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
