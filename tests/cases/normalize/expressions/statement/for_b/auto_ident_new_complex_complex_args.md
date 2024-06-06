# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Statement > For b > Auto ident new complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; new ($($))($(1), $(2)); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while (new ($($))($(1), $(2))) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpNewCallee = $($);
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  const tmpIfTest = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
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
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
$(1);
const tmpNewCallee$1 = $($);
const tmpCalleeParam$2 = $(1);
const tmpCalleeParam$4 = $(2);
new tmpNewCallee$1(tmpCalleeParam$2, tmpCalleeParam$4);
$(1);
const tmpNewCallee$2 = $($);
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$5 = $(2);
new tmpNewCallee$2(tmpCalleeParam$3, tmpCalleeParam$5);
$(1);
const tmpNewCallee$3 = $($);
const tmpCalleeParam$6 = $(1);
const tmpCalleeParam$8 = $(2);
new tmpNewCallee$3(tmpCalleeParam$6, tmpCalleeParam$8);
$(1);
const tmpNewCallee$4 = $($);
const tmpCalleeParam$7 = $(1);
const tmpCalleeParam$9 = $(2);
new tmpNewCallee$4(tmpCalleeParam$7, tmpCalleeParam$9);
$(1);
const tmpNewCallee$5 = $($);
const tmpCalleeParam$10 = $(1);
const tmpCalleeParam$12 = $(2);
new tmpNewCallee$5(tmpCalleeParam$10, tmpCalleeParam$12);
$(1);
const tmpNewCallee$6 = $($);
const tmpCalleeParam$11 = $(1);
const tmpCalleeParam$13 = $(2);
new tmpNewCallee$6(tmpCalleeParam$11, tmpCalleeParam$13);
$(1);
const tmpNewCallee$7 = $($);
const tmpCalleeParam$14 = $(1);
const tmpCalleeParam$16 = $(2);
new tmpNewCallee$7(tmpCalleeParam$14, tmpCalleeParam$16);
$(1);
const tmpNewCallee$8 = $($);
const tmpCalleeParam$15 = $(1);
const tmpCalleeParam$17 = $(2);
new tmpNewCallee$8(tmpCalleeParam$15, tmpCalleeParam$17);
$(1);
const tmpNewCallee$9 = $($);
const tmpCalleeParam$18 = $(1);
const tmpCalleeParam$20 = $(2);
new tmpNewCallee$9(tmpCalleeParam$18, tmpCalleeParam$20);
$(1);
const tmpNewCallee$10 = $($);
const tmpCalleeParam$19 = $(1);
const tmpCalleeParam$21 = $(2);
new tmpNewCallee$10(tmpCalleeParam$19, tmpCalleeParam$21);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpNewCallee$11 = $($);
  const tmpCalleeParam$22 = $(1);
  const tmpCalleeParam$24 = $(2);
  new tmpNewCallee$11(tmpCalleeParam$22, tmpCalleeParam$24);
  $(1);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
new a( b, c );
$( 1 );
const d = $( $ );
const e = $( 1 );
const f = $( 2 );
new d( e, f );
$( 1 );
const g = $( $ );
const h = $( 1 );
const i = $( 2 );
new g( h, i );
$( 1 );
const j = $( $ );
const k = $( 1 );
const l = $( 2 );
new j( k, l );
$( 1 );
const m = $( $ );
const n = $( 1 );
const o = $( 2 );
new m( n, o );
$( 1 );
const p = $( $ );
const q = $( 1 );
const r = $( 2 );
new p( q, r );
$( 1 );
const s = $( $ );
const t = $( 1 );
const u = $( 2 );
new s( t, u );
$( 1 );
const v = $( $ );
const w = $( 1 );
const x = $( 2 );
new v( w, x );
$( 1 );
const y = $( $ );
const z = $( 1 );
const 01 = $( 2 );
new y( z, 01 );
$( 1 );
const 11 = $( $ );
const 21 = $( 1 );
const 31 = $( 2 );
new 11( 21, 31 );
$( 1 );
const 41 = $( $ );
const 51 = $( 1 );
const 61 = $( 2 );
new 41( 51, 61 );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const 71 = $( $ );
  const 81 = $( 1 );
  const 91 = $( 2 );
  new 71( 81, 91 );
  $( 1 );
}
const a1 = {
a: 999,
b: 1000
;
$( a1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 1
 - 6: '<$>'
 - 7: 1
 - 8: 2
 - 9: 1, 2
 - 10: 1
 - 11: '<$>'
 - 12: 1
 - 13: 2
 - 14: 1, 2
 - 15: 1
 - 16: '<$>'
 - 17: 1
 - 18: 2
 - 19: 1, 2
 - 20: 1
 - 21: '<$>'
 - 22: 1
 - 23: 2
 - 24: 1, 2
 - 25: 1
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
