# Preval test case

# fence_at_loop_dowhile.md

> Normalize > Dce > Continue > Fence at loop dowhile
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  $('loop');
  
  do {
    $('loop');
    continue;
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
      $continue: {
        {
          $(`loop`);
          break $continue;
          $(`fail`);
        }
      }
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
    while (true) {
      $continue: {
        $(`loop`);
        break $continue;
      }
      const tmpIfTest$1 = $(true);
      if (tmpIfTest$1) {
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
    let $tmpLoopUnrollCheck = true;
    $(`loop`);
    const tmpIfTest$1 = $(true);
    if (tmpIfTest$1) {
    } else {
      $tmpLoopUnrollCheck = false;
    }
    if ($tmpLoopUnrollCheck) {
      while ($LOOP_UNROLL_10) {
        $(`loop`);
        const tmpIfTest$2 = $(true);
        if (tmpIfTest$2) {
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
    let b = true;
    $( "loop" );
    const c = $( true );
    if (c) {

    }
    else {
      b = false;
    }
    if (b) {
      while ($LOOP_UNROLL_10) {
        $( "loop" );
        const d = $( true );
        if (d) {

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
 - 3: 'loop'
 - 4: true
 - 5: 'loop'
 - 6: true
 - 7: 'loop'
 - 8: true
 - 9: 'loop'
 - 10: true
 - 11: 'loop'
 - 12: true
 - 13: 'loop'
 - 14: true
 - 15: 'loop'
 - 16: true
 - 17: 'loop'
 - 18: true
 - 19: 'loop'
 - 20: true
 - 21: 'loop'
 - 22: true
 - 23: 'loop'
 - 24: true
 - 25: 'loop'
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
