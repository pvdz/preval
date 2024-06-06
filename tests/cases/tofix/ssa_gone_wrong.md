# Preval test case

# ssa_gone_wrong.md

> Tofix > Ssa gone wrong
>
> Looks like ssa is going off the rails here

#TODO

## Input

`````js filename=intro
let i = 0;
let x = $(10);
while (true) {
  x = $(++i, 'set'); // Perfect SSA target
  $(x, 'loop');
}
`````

## Pre Normal

`````js filename=intro
let i = 0;
let x = $(10);
while (true) {
  x = $(++i, `set`);
  $(x, `loop`);
}
`````

## Normalized

`````js filename=intro
let i = 0;
let x = $(10);
while (true) {
  const tmpCallCallee = $;
  i = i + 1;
  let tmpCalleeParam = i;
  const tmpCalleeParam$1 = `set`;
  x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  $(x, `loop`);
}
`````

## Output

`````js filename=intro
$(10);
const tmpClusterSSA_x = $(1, `set`);
$(tmpClusterSSA_x, `loop`);
const tmpClusterSSA_x$1 = $(2, `set`);
$(tmpClusterSSA_x$1, `loop`);
const tmpClusterSSA_x$2 = $(3, `set`);
$(tmpClusterSSA_x$2, `loop`);
const tmpClusterSSA_x$3 = $(4, `set`);
$(tmpClusterSSA_x$3, `loop`);
const tmpClusterSSA_x$4 = $(5, `set`);
$(tmpClusterSSA_x$4, `loop`);
const tmpClusterSSA_x$5 = $(6, `set`);
$(tmpClusterSSA_x$5, `loop`);
const tmpClusterSSA_x$6 = $(7, `set`);
$(tmpClusterSSA_x$6, `loop`);
const tmpClusterSSA_x$7 = $(8, `set`);
$(tmpClusterSSA_x$7, `loop`);
const tmpClusterSSA_x$8 = $(9, `set`);
$(tmpClusterSSA_x$8, `loop`);
const tmpClusterSSA_x$9 = $(10, `set`);
$(tmpClusterSSA_x$9, `loop`);
let tmpClusterSSA_i$1 = 11;
const tmpClusterSSA_x$10 = $(11, `set`);
$(tmpClusterSSA_x$10, `loop`);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  tmpClusterSSA_i$1 = tmpClusterSSA_i$1 + 1;
  const tmpClusterSSA_x$11 = $(tmpClusterSSA_i$1, `set`);
  $(tmpClusterSSA_x$11, `loop`);
}
`````

## PST Output

With rename=true

`````js filename=intro
$( 10 );
const a = $( 1, "set" );
$( a, "loop" );
const b = $( 2, "set" );
$( b, "loop" );
const c = $( 3, "set" );
$( c, "loop" );
const d = $( 4, "set" );
$( d, "loop" );
const e = $( 5, "set" );
$( e, "loop" );
const f = $( 6, "set" );
$( f, "loop" );
const g = $( 7, "set" );
$( g, "loop" );
const h = $( 8, "set" );
$( h, "loop" );
const i = $( 9, "set" );
$( i, "loop" );
const j = $( 10, "set" );
$( j, "loop" );
let k = 11;
const l = $( 11, "set" );
$( l, "loop" );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  k = k + 1;
  const m = $( k, "set" );
  $( m, "loop" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 1, 'set'
 - 3: 1, 'loop'
 - 4: 2, 'set'
 - 5: 2, 'loop'
 - 6: 3, 'set'
 - 7: 3, 'loop'
 - 8: 4, 'set'
 - 9: 4, 'loop'
 - 10: 5, 'set'
 - 11: 5, 'loop'
 - 12: 6, 'set'
 - 13: 6, 'loop'
 - 14: 7, 'set'
 - 15: 7, 'loop'
 - 16: 8, 'set'
 - 17: 8, 'loop'
 - 18: 9, 'set'
 - 19: 9, 'loop'
 - 20: 10, 'set'
 - 21: 10, 'loop'
 - 22: 11, 'set'
 - 23: 11, 'loop'
 - 24: 12, 'set'
 - 25: 12, 'loop'
 - 26: 13, 'set'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
