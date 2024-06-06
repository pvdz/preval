# Preval test case

# object_empty.md

> Normalize > While > Test > Object empty
>
> Certain test values can be statically determined to be true or false

#TODO

## Input

`````js filename=intro
while ({}) {
  $('loop');
}
$('after');
`````

## Pre Normal


`````js filename=intro
while ({}) {
  $(`loop`);
}
$(`after`);
`````

## Normalized


`````js filename=intro
let tmpIfTest = {};
while (true) {
  if (tmpIfTest) {
    $(`loop`);
    tmpIfTest = {};
  } else {
    break;
  }
}
$(`after`);
`````

## Output


`````js filename=intro
$(`loop`);
$(`loop`);
$(`loop`);
$(`loop`);
$(`loop`);
$(`loop`);
$(`loop`);
$(`loop`);
$(`loop`);
$(`loop`);
$(`loop`);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`loop`);
}
$(`after`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "loop" );
$( "loop" );
$( "loop" );
$( "loop" );
$( "loop" );
$( "loop" );
$( "loop" );
$( "loop" );
$( "loop" );
$( "loop" );
$( "loop" );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( "loop" );
}
$( "after" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'loop'
 - 2: 'loop'
 - 3: 'loop'
 - 4: 'loop'
 - 5: 'loop'
 - 6: 'loop'
 - 7: 'loop'
 - 8: 'loop'
 - 9: 'loop'
 - 10: 'loop'
 - 11: 'loop'
 - 12: 'loop'
 - 13: 'loop'
 - 14: 'loop'
 - 15: 'loop'
 - 16: 'loop'
 - 17: 'loop'
 - 18: 'loop'
 - 19: 'loop'
 - 20: 'loop'
 - 21: 'loop'
 - 22: 'loop'
 - 23: 'loop'
 - 24: 'loop'
 - 25: 'loop'
 - 26: 'loop'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
