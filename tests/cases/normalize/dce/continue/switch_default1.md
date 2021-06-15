# Preval test case

# switch_default1.md

> Normalize > Dce > Continue > Switch default1
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  switch ($(1, 'disc')) {
    case $(0):
      $('keep, do not eval');
      continue;
    default:
      continue;
  }
  $('eliminate');
}
$('after, do not evaluate (infinite loop)');
`````

## Pre Normal

`````js filename=intro
while ($(true)) {
  {
    const tmpSwitchValue = $(1, `disc`);
    let tmpSwitchCaseToStart = 1;
    if ($(0) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        $(`keep, do not eval`);
        continue;
      }
      if (tmpSwitchCaseToStart <= 1) {
        continue;
      }
    }
  }
  $(`eliminate`);
}
$(`after, do not evaluate (infinite loop)`);
`````

## Normalized

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpSwitchValue = $(1, `disc`);
    let tmpSwitchCaseToStart = 1;
    const tmpBinLhs = $(0);
    const tmpIfTest$1 = tmpBinLhs === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 0;
    } else {
    }
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$3) {
      $(`keep, do not eval`);
      continue;
    } else {
      const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
      if (tmpIfTest$5) {
        continue;
      } else {
        $(`eliminate`);
      }
    }
  } else {
    break;
  }
}
$(`after, do not evaluate (infinite loop)`);
`````

## Output

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpSwitchValue = $(1, `disc`);
    let tmpSwitchCaseToStart = 1;
    const tmpBinLhs = $(0);
    const tmpIfTest$1 = tmpBinLhs === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 0;
    } else {
    }
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$3) {
      $(`keep, do not eval`);
      continue;
    } else {
      const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
      if (tmpIfTest$5) {
        continue;
      } else {
        $(`eliminate`);
      }
    }
  } else {
    break;
  }
}
$(`after, do not evaluate (infinite loop)`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 1, 'disc'
 - 3: 0
 - 4: true
 - 5: 1, 'disc'
 - 6: 0
 - 7: true
 - 8: 1, 'disc'
 - 9: 0
 - 10: true
 - 11: 1, 'disc'
 - 12: 0
 - 13: true
 - 14: 1, 'disc'
 - 15: 0
 - 16: true
 - 17: 1, 'disc'
 - 18: 0
 - 19: true
 - 20: 1, 'disc'
 - 21: 0
 - 22: true
 - 23: 1, 'disc'
 - 24: 0
 - 25: true
 - 26: 1, 'disc'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
