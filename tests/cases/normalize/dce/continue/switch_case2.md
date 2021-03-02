# Preval test case

# switch_case2.md

> Normalize > Dce > Continue > Switch case2
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  switch ($(1, 'disc')) {
    case $(1, 'case'):
      continue;
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
    const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$2) {
      continue;
    } else {
      $('keep');
    }
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
    const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$2) {
      continue;
    } else {
      $('keep');
    }
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
 - 3: 1, 'case'
 - 4: true
 - 5: 1, 'disc'
 - 6: 1, 'case'
 - 7: true
 - 8: 1, 'disc'
 - 9: 1, 'case'
 - 10: true
 - 11: 1, 'disc'
 - 12: 1, 'case'
 - 13: true
 - 14: 1, 'disc'
 - 15: 1, 'case'
 - 16: true
 - 17: 1, 'disc'
 - 18: 1, 'case'
 - 19: true
 - 20: 1, 'disc'
 - 21: 1, 'case'
 - 22: true
 - 23: 1, 'disc'
 - 24: 1, 'case'
 - 25: true
 - 26: 1, 'disc'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
