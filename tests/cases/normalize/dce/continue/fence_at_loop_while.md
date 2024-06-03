# Preval test case

# fence_at_loop_while.md

> Normalize > Dce > Continue > Fence at loop while
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  $('loop');
  
  while ($(true)) {
    $('loop');
    continue;
    $('fail');
  }

  $('infiloop, do not eliminate');
}
$('after (not invoked)');
`````

## Pre Normal

`````js filename=intro
while ($(true)) {
  $(`loop`);
  while ($(true)) {
    $continue: {
      {
        $(`loop`);
        break $continue;
        $(`fail`);
      }
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
    let tmpIfTest$1 = $(true);
    while (true) {
      if (tmpIfTest$1) {
        $continue: {
          $(`loop`);
          break $continue;
        }
        tmpIfTest$1 = $(true);
      } else {
        break;
      }
    }
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
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    $(`loop`);
    let tmpIfTest$1 = $(true);
    if (tmpIfTest$1) {
      $(`loop`);
      tmpIfTest$1 = $(true);
      while ($LOOP_UNROLL_10) {
        if (tmpIfTest$1) {
          $(`loop`);
          tmpIfTest$1 = $(true);
        } else {
          break;
        }
      }
    } else {
    }
    $(`infiloop, do not eliminate`);
    tmpIfTest = $(true);
  } else {
    break;
  }
}
$(`after (not invoked)`);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( true );
while (true) {
  if (a) {
    $( "loop" );
    let b = $( true );
    if (b) {
      $( "loop" );
      b = $( true );
      while ($LOOP_UNROLL_10) {
        if (b) {
          $( "loop" );
          b = $( true );
        }
        else {
          break;
        }
      }
    }
    $( "infiloop, do not eliminate" );
    a = $( true );
  }
  else {
    break;
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
 - 3: true
 - 4: 'loop'
 - 5: true
 - 6: 'loop'
 - 7: true
 - 8: 'loop'
 - 9: true
 - 10: 'loop'
 - 11: true
 - 12: 'loop'
 - 13: true
 - 14: 'loop'
 - 15: true
 - 16: 'loop'
 - 17: true
 - 18: 'loop'
 - 19: true
 - 20: 'loop'
 - 21: true
 - 22: 'loop'
 - 23: true
 - 24: 'loop'
 - 25: true
 - 26: 'loop'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
