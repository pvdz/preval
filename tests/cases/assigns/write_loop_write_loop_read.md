# Preval test case

# write_loop_write_loop_read.md

> Assigns > Write loop write loop read
>
> Turning a var into a const. Or not.

#TODO

## Input

`````js filename=intro
let x = $(10);
while (true) {
  x = $(20, 'set'); // Perfect SSA target
  $(x, 'loop');
}
`````

## Pre Normal

`````js filename=intro
let x = $(10);
while (true) {
  x = $(20, `set`);
  $(x, `loop`);
}
`````

## Normalized

`````js filename=intro
let x = $(10);
while (true) {
  x = $(20, `set`);
  $(x, `loop`);
}
`````

## Output

`````js filename=intro
$(10);
const tmpClusterSSA_x = $(20, `set`);
$(tmpClusterSSA_x, `loop`);
const tmpClusterSSA_x$1 = $(20, `set`);
$(tmpClusterSSA_x$1, `loop`);
const tmpClusterSSA_x$2 = $(20, `set`);
$(tmpClusterSSA_x$2, `loop`);
const tmpClusterSSA_x$3 = $(20, `set`);
$(tmpClusterSSA_x$3, `loop`);
const tmpClusterSSA_x$4 = $(20, `set`);
$(tmpClusterSSA_x$4, `loop`);
const tmpClusterSSA_x$5 = $(20, `set`);
$(tmpClusterSSA_x$5, `loop`);
const tmpClusterSSA_x$6 = $(20, `set`);
$(tmpClusterSSA_x$6, `loop`);
const tmpClusterSSA_x$7 = $(20, `set`);
$(tmpClusterSSA_x$7, `loop`);
const tmpClusterSSA_x$8 = $(20, `set`);
$(tmpClusterSSA_x$8, `loop`);
const tmpClusterSSA_x$9 = $(20, `set`);
$(tmpClusterSSA_x$9, `loop`);
const tmpClusterSSA_x$10 = $(20, `set`);
$(tmpClusterSSA_x$10, `loop`);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpClusterSSA_x$11 = $(20, `set`);
  $(tmpClusterSSA_x$11, `loop`);
}
`````

## PST Output

With rename=true

`````js filename=intro
$( 10 );
const a = $( 20, "set" );
$( a, "loop" );
const b = $( 20, "set" );
$( b, "loop" );
const c = $( 20, "set" );
$( c, "loop" );
const d = $( 20, "set" );
$( d, "loop" );
const e = $( 20, "set" );
$( e, "loop" );
const f = $( 20, "set" );
$( f, "loop" );
const g = $( 20, "set" );
$( g, "loop" );
const h = $( 20, "set" );
$( h, "loop" );
const i = $( 20, "set" );
$( i, "loop" );
const j = $( 20, "set" );
$( j, "loop" );
const k = $( 20, "set" );
$( k, "loop" );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const l = $( 20, "set" );
  $( l, "loop" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20, 'set'
 - 3: 20, 'loop'
 - 4: 20, 'set'
 - 5: 20, 'loop'
 - 6: 20, 'set'
 - 7: 20, 'loop'
 - 8: 20, 'set'
 - 9: 20, 'loop'
 - 10: 20, 'set'
 - 11: 20, 'loop'
 - 12: 20, 'set'
 - 13: 20, 'loop'
 - 14: 20, 'set'
 - 15: 20, 'loop'
 - 16: 20, 'set'
 - 17: 20, 'loop'
 - 18: 20, 'set'
 - 19: 20, 'loop'
 - 20: 20, 'set'
 - 21: 20, 'loop'
 - 22: 20, 'set'
 - 23: 20, 'loop'
 - 24: 20, 'set'
 - 25: 20, 'loop'
 - 26: 20, 'set'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
