# Preval test case

# loop_redundant2.md

> Ref tracking > Loop redundant2

## Input

`````js filename=intro
let dathing = "jhayon.vercel.app";
const d = $( "x" );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  dathing = $;
  $(dathing);
}
`````

## Pre Normal

`````js filename=intro
let dathing = `jhayon.vercel.app`;
const d = $(`x`);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  dathing = $;
  $(dathing);
}
`````

## Normalized

`````js filename=intro
let dathing = `jhayon.vercel.app`;
const d = $(`x`);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  dathing = $;
  $(dathing);
}
`````

## Output

`````js filename=intro
$(`x`);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $($);
}
`````

## PST Output

With rename=true

`````js filename=intro
$( "x" );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( $ );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - 2: '<$>'
 - 3: '<$>'
 - 4: '<$>'
 - 5: '<$>'
 - 6: '<$>'
 - 7: '<$>'
 - 8: '<$>'
 - 9: '<$>'
 - 10: '<$>'
 - 11: '<$>'
 - 12: '<$>'
 - 13: '<$>'
 - 14: '<$>'
 - 15: '<$>'
 - 16: '<$>'
 - 17: '<$>'
 - 18: '<$>'
 - 19: '<$>'
 - 20: '<$>'
 - 21: '<$>'
 - 22: '<$>'
 - 23: '<$>'
 - 24: '<$>'
 - 25: '<$>'
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
