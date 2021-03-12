# Preval test case

# dowhile2.md

> Normalize > Dce > Continue > Dowhile2
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
  $('keep, wont eval due to infinite loop');
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
        $('loop');
        continue;
        $('fail');
      }
    }
  }
  $('keep, wont eval due to infinite loop');
}
$('after, wont eval due to infinite loop');
`````

## Normalized

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
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
        $('loop');
        continue;
      } else {
        break;
      }
    }
    $('keep, wont eval due to infinite loop');
  } else {
    break;
  }
}
$('after, wont eval due to infinite loop');
`````

## Output

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
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
        $('loop');
        continue;
      } else {
        break;
      }
    }
    $('keep, wont eval due to infinite loop');
  } else {
    break;
  }
}
$('after, wont eval due to infinite loop');
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
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
