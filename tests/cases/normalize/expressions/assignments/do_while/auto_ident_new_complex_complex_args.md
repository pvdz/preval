# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Assignments > Do while > Auto ident new complex complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = new ($($))($(1), $(2))));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = new ($($))($(1), $(2)))) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpNewCallee = $($);
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
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
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
$(100);
const tmpNewCallee$1 = $($);
const tmpCalleeParam$2 = $(1);
const tmpCalleeParam$4 = $(2);
new tmpNewCallee$1(tmpCalleeParam$2, tmpCalleeParam$4);
$(100);
const tmpNewCallee$2 = $($);
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$5 = $(2);
new tmpNewCallee$2(tmpCalleeParam$3, tmpCalleeParam$5);
$(100);
const tmpNewCallee$3 = $($);
const tmpCalleeParam$6 = $(1);
const tmpCalleeParam$8 = $(2);
new tmpNewCallee$3(tmpCalleeParam$6, tmpCalleeParam$8);
$(100);
const tmpNewCallee$4 = $($);
const tmpCalleeParam$7 = $(1);
const tmpCalleeParam$9 = $(2);
new tmpNewCallee$4(tmpCalleeParam$7, tmpCalleeParam$9);
$(100);
const tmpNewCallee$5 = $($);
const tmpCalleeParam$10 = $(1);
const tmpCalleeParam$12 = $(2);
new tmpNewCallee$5(tmpCalleeParam$10, tmpCalleeParam$12);
$(100);
const tmpNewCallee$6 = $($);
const tmpCalleeParam$11 = $(1);
const tmpCalleeParam$13 = $(2);
new tmpNewCallee$6(tmpCalleeParam$11, tmpCalleeParam$13);
$(100);
const tmpNewCallee$7 = $($);
const tmpCalleeParam$14 = $(1);
const tmpCalleeParam$16 = $(2);
new tmpNewCallee$7(tmpCalleeParam$14, tmpCalleeParam$16);
$(100);
const tmpNewCallee$8 = $($);
const tmpCalleeParam$15 = $(1);
const tmpCalleeParam$17 = $(2);
new tmpNewCallee$8(tmpCalleeParam$15, tmpCalleeParam$17);
$(100);
const tmpNewCallee$9 = $($);
const tmpCalleeParam$18 = $(1);
const tmpCalleeParam$20 = $(2);
new tmpNewCallee$9(tmpCalleeParam$18, tmpCalleeParam$20);
$(100);
const tmpNewCallee$10 = $($);
const tmpCalleeParam$19 = $(1);
const tmpCalleeParam$21 = $(2);
let a = new tmpNewCallee$10(tmpCalleeParam$19, tmpCalleeParam$21);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpNewCallee$11 = $($);
  const tmpCalleeParam$22 = $(1);
  const tmpCalleeParam$24 = $(2);
  a = new tmpNewCallee$11(tmpCalleeParam$22, tmpCalleeParam$24);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
new a( b, c );
$( 100 );
const d = $( $ );
const e = $( 1 );
const f = $( 2 );
new d( e, f );
$( 100 );
const g = $( $ );
const h = $( 1 );
const i = $( 2 );
new g( h, i );
$( 100 );
const j = $( $ );
const k = $( 1 );
const l = $( 2 );
new j( k, l );
$( 100 );
const m = $( $ );
const n = $( 1 );
const o = $( 2 );
new m( n, o );
$( 100 );
const p = $( $ );
const q = $( 1 );
const r = $( 2 );
new p( q, r );
$( 100 );
const s = $( $ );
const t = $( 1 );
const u = $( 2 );
new s( t, u );
$( 100 );
const v = $( $ );
const w = $( 1 );
const x = $( 2 );
new v( w, x );
$( 100 );
const y = $( $ );
const z = $( 1 );
const 01 = $( 2 );
new y( z, 01 );
$( 100 );
const 11 = $( $ );
const 21 = $( 1 );
const 31 = $( 2 );
new 11( 21, 31 );
$( 100 );
const 41 = $( $ );
const 51 = $( 1 );
const 61 = $( 2 );
let 71 = new 41( 51, 61 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const 81 = $( $ );
  const 91 = $( 1 );
  const a1 = $( 2 );
  71 = new 81( 91, a1 );
}
$( 71 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: '<$>'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - 6: 100
 - 7: '<$>'
 - 8: 1
 - 9: 2
 - 10: 1, 2
 - 11: 100
 - 12: '<$>'
 - 13: 1
 - 14: 2
 - 15: 1, 2
 - 16: 100
 - 17: '<$>'
 - 18: 1
 - 19: 2
 - 20: 1, 2
 - 21: 100
 - 22: '<$>'
 - 23: 1
 - 24: 2
 - 25: 1, 2
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
