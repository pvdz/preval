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
let x = $(1, `set`);
$(x, `loop`);
x = $(2, `set`);
$(x, `loop`);
x = $(3, `set`);
$(x, `loop`);
x = $(4, `set`);
$(x, `loop`);
x = $(5, `set`);
$(x, `loop`);
x = $(6, `set`);
$(x, `loop`);
x = $(7, `set`);
$(x, `loop`);
x = $(8, `set`);
$(x, `loop`);
x = $(9, `set`);
$(x, `loop`);
x = $(10, `set`);
$(x, `loop`);
let tmpSSA_i$1 = 11;
x = $(11, `set`);
$(x, `loop`);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  tmpSSA_i$1 = tmpSSA_i$1 + 1;
  x = $(tmpSSA_i$1, `set`);
  $(x, `loop`);
}
`````

## PST Output

With rename=true

`````js filename=intro
$( 10 );
let a = $( 1, "set" );
$( a, "loop" );
a = $( 2, "set" );
$( a, "loop" );
a = $( 3, "set" );
$( a, "loop" );
a = $( 4, "set" );
$( a, "loop" );
a = $( 5, "set" );
$( a, "loop" );
a = $( 6, "set" );
$( a, "loop" );
a = $( 7, "set" );
$( a, "loop" );
a = $( 8, "set" );
$( a, "loop" );
a = $( 9, "set" );
$( a, "loop" );
a = $( 10, "set" );
$( a, "loop" );
let b = 11;
a = $( 11, "set" );
$( a, "loop" );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  b = b + 1;
  a = $( b, "set" );
  $( a, "loop" );
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
