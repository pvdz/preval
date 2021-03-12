# Preval test case

# switch_default2.md

> Normalize > Dce > Break > Switch default2
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  switch ($(1, 'disc')) {
    case $(0):
      $('keep, do not eval');
      break;
    default:
      break;
      $('fail');
  }
  $('keep');
}
$('after, do not evaluate (infinite loop)');
`````

## Pre Normal

`````js filename=intro
while ($(true)) {
  {
    const tmpSwitchValue = $(1, 'disc');
    let tmpSwitchCaseToStart = 1;
    if ($(0) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        $('keep, do not eval');
        break tmpSwitchBreak;
      }
      if (tmpSwitchCaseToStart <= 1) {
        break tmpSwitchBreak;
        $('fail');
      }
    }
  }
  $('keep');
}
$('after, do not evaluate (infinite loop)');
`````

## Normalized

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpSwitchValue = $(1, 'disc');
    let tmpSwitchCaseToStart = 1;
    const tmpBinLhs = $(0);
    const tmpIfTest$1 = tmpBinLhs === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 0;
    }
    tmpSwitchBreak: {
      const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
      if (tmpIfTest$2) {
        $('keep, do not eval');
        break tmpSwitchBreak;
      } else {
        const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
        if (tmpIfTest$3) {
          break tmpSwitchBreak;
        }
      }
    }
    $('keep');
  } else {
    break;
  }
}
$('after, do not evaluate (infinite loop)');
`````

## Output

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpSwitchValue = $(1, 'disc');
    let tmpSwitchCaseToStart = 1;
    const tmpBinLhs = $(0);
    const tmpIfTest$1 = tmpBinLhs === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 0;
    }
    tmpSwitchBreak: {
      const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
      if (tmpIfTest$2) {
        $('keep, do not eval');
        break tmpSwitchBreak;
      } else {
        const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
        if (tmpIfTest$3) {
          break tmpSwitchBreak;
        }
      }
    }
    $('keep');
  } else {
    break;
  }
}
$('after, do not evaluate (infinite loop)');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 1, 'disc'
 - 3: 0
 - 4: 'keep'
 - 5: true
 - 6: 1, 'disc'
 - 7: 0
 - 8: 'keep'
 - 9: true
 - 10: 1, 'disc'
 - 11: 0
 - 12: 'keep'
 - 13: true
 - 14: 1, 'disc'
 - 15: 0
 - 16: 'keep'
 - 17: true
 - 18: 1, 'disc'
 - 19: 0
 - 20: 'keep'
 - 21: true
 - 22: 1, 'disc'
 - 23: 0
 - 24: 'keep'
 - 25: true
 - 26: 1, 'disc'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
