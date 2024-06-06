# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Assignments > For b > Auto ident new ident complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; (a = new $($(1), $(2))); $(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while ((a = new $($(1), $(2)))) {
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
  const tmpNewCallee = $;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  let tmpIfTest = a;
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
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const a = new $(tmpCalleeParam, tmpCalleeParam$1);
$(1);
const tmpCalleeParam$2 = $(1);
const tmpCalleeParam$4 = $(2);
new $(tmpCalleeParam$2, tmpCalleeParam$4);
$(1);
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$5 = $(2);
new $(tmpCalleeParam$3, tmpCalleeParam$5);
$(1);
const tmpCalleeParam$6 = $(1);
const tmpCalleeParam$8 = $(2);
new $(tmpCalleeParam$6, tmpCalleeParam$8);
$(1);
const tmpCalleeParam$7 = $(1);
const tmpCalleeParam$9 = $(2);
new $(tmpCalleeParam$7, tmpCalleeParam$9);
$(1);
const tmpCalleeParam$10 = $(1);
const tmpCalleeParam$12 = $(2);
new $(tmpCalleeParam$10, tmpCalleeParam$12);
$(1);
const tmpCalleeParam$11 = $(1);
const tmpCalleeParam$13 = $(2);
new $(tmpCalleeParam$11, tmpCalleeParam$13);
$(1);
const tmpCalleeParam$14 = $(1);
const tmpCalleeParam$16 = $(2);
new $(tmpCalleeParam$14, tmpCalleeParam$16);
$(1);
const tmpCalleeParam$15 = $(1);
const tmpCalleeParam$17 = $(2);
new $(tmpCalleeParam$15, tmpCalleeParam$17);
$(1);
const tmpCalleeParam$18 = $(1);
const tmpCalleeParam$20 = $(2);
new $(tmpCalleeParam$18, tmpCalleeParam$20);
$(1);
const tmpCalleeParam$19 = $(1);
const tmpCalleeParam$21 = $(2);
new $(tmpCalleeParam$19, tmpCalleeParam$21);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam$22 = $(1);
  const tmpCalleeParam$24 = $(2);
  new $(tmpCalleeParam$22, tmpCalleeParam$24);
  $(1);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = new $( a, b );
$( 1 );
const d = $( 1 );
const e = $( 2 );
new $( d, e );
$( 1 );
const f = $( 1 );
const g = $( 2 );
new $( f, g );
$( 1 );
const h = $( 1 );
const i = $( 2 );
new $( h, i );
$( 1 );
const j = $( 1 );
const k = $( 2 );
new $( j, k );
$( 1 );
const l = $( 1 );
const m = $( 2 );
new $( l, m );
$( 1 );
const n = $( 1 );
const o = $( 2 );
new $( n, o );
$( 1 );
const p = $( 1 );
const q = $( 2 );
new $( p, q );
$( 1 );
const r = $( 1 );
const s = $( 2 );
new $( r, s );
$( 1 );
const t = $( 1 );
const u = $( 2 );
new $( t, u );
$( 1 );
const v = $( 1 );
const w = $( 2 );
new $( v, w );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x = $( 1 );
  const y = $( 2 );
  new $( x, y );
  $( 1 );
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 1, 2
 - 8: 1
 - 9: 1
 - 10: 2
 - 11: 1, 2
 - 12: 1
 - 13: 1
 - 14: 2
 - 15: 1, 2
 - 16: 1
 - 17: 1
 - 18: 2
 - 19: 1, 2
 - 20: 1
 - 21: 1
 - 22: 2
 - 23: 1, 2
 - 24: 1
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
