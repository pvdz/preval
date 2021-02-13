# Preval test case

# base.md

> normalize > dce > base
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  switch ($(1, 'disc')) {
    case $(1, 'case'):
      break;
      $('fail');
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
    const tmpSwitchTest = $(1, 'disc');
    const tmpSwitchValue = tmpSwitchTest;
    let tmpSwitchCaseToStart = 1;
    const tmpBinLhs = $(1, 'case');
    const tmpIfTest$1 = tmpBinLhs === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 0;
    }
    tmpSwitchBreak: {
      const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
      if (tmpIfTest$2) {
        break tmpSwitchBreak;
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
    const tmpSwitchTest = $(1, 'disc');
    let tmpSwitchCaseToStart = 1;
    const tmpBinLhs = $(1, 'case');
    const tmpIfTest$1 = tmpBinLhs === tmpSwitchTest;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 0;
    }
    tmpSwitchBreak: {
      const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
      if (tmpIfTest$2) {
        break tmpSwitchBreak;
      }
    }
    $('keep');
  } else {
    break;
  }
}
$('after, do not evaluate (infinite loop)');
`````

## Result

Should call `$` with:
 - 1: true
 - 2: 1, 'disc'
 - 3: 1, 'case'
 - 4: 'keep'
 - 5: true
 - 6: 1, 'disc'
 - 7: 1, 'case'
 - 8: 'keep'
 - 9: true
 - 10: 1, 'disc'
 - 11: 1, 'case'
 - 12: 'keep'
 - 13: true
 - 14: 1, 'disc'
 - 15: 1, 'case'
 - 16: 'keep'
 - 17: true
 - 18: 1, 'disc'
 - 19: 1, 'case'
 - 20: 'keep'
 - 21: true
 - 22: 1, 'disc'
 - 23: 1, 'case'
 - 24: 'keep'
 - 25: true
 - 26: 1, 'disc'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
