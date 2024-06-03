# Preval test case

# dowhile.md

> Normalize > Dce > Continue > Dowhile
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  do {
    $('loop');
    continue;
    $('fail');
  } while ($(true));
}
$('after, wont eval due to infinite loop');
`````

## Pre Normal

`````js filename=intro
while ($(true)) {
  {
    let tmpDoWhileFlag = true;
    while (tmpDoWhileFlag || $(true)) {
      tmpDoWhileFlag = false;
      {
        $continue: {
          {
            $(`loop`);
            break $continue;
            $(`fail`);
          }
        }
      }
    }
  }
}
$(`after, wont eval due to infinite loop`);
`````

## Normalized

`````js filename=intro
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    let tmpDoWhileFlag = true;
    while (true) {
      let tmpIfTest$1 = tmpDoWhileFlag;
      if (tmpIfTest$1) {
      } else {
        tmpIfTest$1 = $(true);
      }
      if (tmpIfTest$1) {
        tmpDoWhileFlag = false;
        $continue: {
          $(`loop`);
          break $continue;
        }
      } else {
        break;
      }
    }
    tmpIfTest = $(true);
  } else {
    break;
  }
}
$(`after, wont eval due to infinite loop`);
`````

## Output

`````js filename=intro
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    $(`loop`);
    while ($LOOP_UNROLL_10) {
      const tmpIfTest$2 = $(true);
      if (tmpIfTest$2) {
        $(`loop`);
      } else {
        break;
      }
    }
    tmpIfTest = $(true);
  } else {
    break;
  }
}
$(`after, wont eval due to infinite loop`);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( true );
while (true) {
  if (a) {
    $( "loop" );
    while ($LOOP_UNROLL_10) {
      const b = $( true );
      if (b) {
        $( "loop" );
      }
      else {
        break;
      }
    }
    a = $( true );
  }
  else {
    break;
  }
}
$( "after, wont eval due to infinite loop" );
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
