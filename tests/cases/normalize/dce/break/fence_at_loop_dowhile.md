# Preval test case

# fence_at_loop_dowhile.md

> Normalize > Dce > Break > Fence at loop dowhile
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Input

`````js filename=intro
while ($(true)) {
  $('loop');
  
  do {
    $('loop');
    break;
    $('fail');
  } while ($(true));

  $('infiloop, do not eliminate');
}
$('after (not invoked)');
`````

## Pre Normal


`````js filename=intro
while ($(true)) {
  $(`loop`);
  while (true) {
    {
      $(`loop`);
      break;
      $(`fail`);
    }
    if ($(true)) {
    } else {
      break;
    }
  }
  $(`infiloop, do not eliminate`);
}
$(`after (not invoked)`);
`````

## Normalized


`````js filename=intro
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    $(`loop`);
    $(`loop`);
    $(`infiloop, do not eliminate`);
    tmpIfTest = $(true);
  } else {
    break;
  }
}
$(`after (not invoked)`);
`````

## Output


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(`loop`);
  $(`loop`);
  $(`infiloop, do not eliminate`);
  let tmpClusterSSA_tmpIfTest = $(true);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      $(`loop`);
      $(`loop`);
      $(`infiloop, do not eliminate`);
      tmpClusterSSA_tmpIfTest = $(true);
    } else {
      break;
    }
  }
} else {
}
$(`after (not invoked)`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "loop" );
  $( "loop" );
  $( "infiloop, do not eliminate" );
  let b = $( true );
  while ($LOOP_UNROLL_10) {
    if (b) {
      $( "loop" );
      $( "loop" );
      $( "infiloop, do not eliminate" );
      b = $( true );
    }
    else {
      break;
    }
  }
}
$( "after (not invoked)" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop'
 - 4: 'infiloop, do not eliminate'
 - 5: true
 - 6: 'loop'
 - 7: 'loop'
 - 8: 'infiloop, do not eliminate'
 - 9: true
 - 10: 'loop'
 - 11: 'loop'
 - 12: 'infiloop, do not eliminate'
 - 13: true
 - 14: 'loop'
 - 15: 'loop'
 - 16: 'infiloop, do not eliminate'
 - 17: true
 - 18: 'loop'
 - 19: 'loop'
 - 20: 'infiloop, do not eliminate'
 - 21: true
 - 22: 'loop'
 - 23: 'loop'
 - 24: 'infiloop, do not eliminate'
 - 25: true
 - 26: 'loop'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
