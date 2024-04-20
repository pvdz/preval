# Preval test case

# write_loop_write_loop_read2.md

> Assigns > Write loop write loop read2
>
> Turning a var into a const. Or not.

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
let x = $(1, `set`);
$(x, `loop`);
const tmpClusterSSA_x = $(2, `set`);
$(tmpClusterSSA_x, `loop`);
$(2, `set`);
$(tmpClusterSSA_x, `loop`);
$(2, `set`);
$(tmpClusterSSA_x, `loop`);
$(2, `set`);
$(tmpClusterSSA_x, `loop`);
$(2, `set`);
$(tmpClusterSSA_x, `loop`);
$(2, `set`);
$(tmpClusterSSA_x, `loop`);
$(2, `set`);
$(tmpClusterSSA_x, `loop`);
$(2, `set`);
$(tmpClusterSSA_x, `loop`);
$(2, `set`);
$(tmpClusterSSA_x, `loop`);
$(2, `set`);
$(tmpClusterSSA_x, `loop`);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  x = $(2, `set`);
  $(tmpClusterSSA_x, `loop`);
}
`````

## PST Output

With rename=true

`````js filename=intro
$( 10 );
let a = $( 1, "set" );
$( a, "loop" );
const b = $( 2, "set" );
$( b, "loop" );
$( 2, "set" );
$( b, "loop" );
$( 2, "set" );
$( b, "loop" );
$( 2, "set" );
$( b, "loop" );
$( 2, "set" );
$( b, "loop" );
$( 2, "set" );
$( b, "loop" );
$( 2, "set" );
$( b, "loop" );
$( 2, "set" );
$( b, "loop" );
$( 2, "set" );
$( b, "loop" );
$( 2, "set" );
$( b, "loop" );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  a = $( 2, "set" );
  $( b, "loop" );
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

Final output calls: BAD!!
 - 1: 10
 - 2: 1, 'set'
 - 3: 1, 'loop'
 - 4: 2, 'set'
 - 5: 2, 'loop'
 - 6: 2, 'set'
 - 7: 2, 'loop'
 - 8: 2, 'set'
 - 9: 2, 'loop'
 - 10: 2, 'set'
 - 11: 2, 'loop'
 - 12: 2, 'set'
 - 13: 2, 'loop'
 - 14: 2, 'set'
 - 15: 2, 'loop'
 - 16: 2, 'set'
 - 17: 2, 'loop'
 - 18: 2, 'set'
 - 19: 2, 'loop'
 - 20: 2, 'set'
 - 21: 2, 'loop'
 - 22: 2, 'set'
 - 23: 2, 'loop'
 - 24: 2, 'set'
 - 25: 2, 'loop'
 - 26: 2, 'set'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')
