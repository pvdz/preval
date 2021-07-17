# Preval test case

# switch_case1.md

> Normalize > Dce > Break > Switch case1
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  switch ($(1, 'disc')) {
    case $(1, 'case'):
      break;
  }
  $('keep');
}
$('after, do not evaluate (infinite loop)');
`````

## Pre Normal

`````js filename=intro
while ($(true)) {
  {
    const tmpSwitchValue = $(1, `disc`);
    let tmpSwitchCaseToStart = 1;
    if ($(1, `case`) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        break tmpSwitchBreak;
      }
    }
  }
  $(`keep`);
}
$(`after, do not evaluate (infinite loop)`);
`````

## Normalized

`````js filename=intro
let tmpIfTest = $(true);
while (tmpIfTest) {
  const tmpSwitchValue = $(1, `disc`);
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $(1, `case`);
  const tmpIfTest$1 = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 0;
  } else {
  }
  tmpSwitchBreak: {
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$3) {
      break tmpSwitchBreak;
    } else {
    }
  }
  $(`keep`);
  tmpIfTest = $(true);
}
$(`after, do not evaluate (infinite loop)`);
`````

## Output

`````js filename=intro
let tmpIfTest = $(true);
while (tmpIfTest) {
  const tmpSwitchValue = $(1, `disc`);
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $(1, `case`);
  const tmpIfTest$1 = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 0;
  } else {
  }
  tmpSwitchBreak: {
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$3) {
      break tmpSwitchBreak;
    } else {
    }
  }
  $(`keep`);
  tmpIfTest = $(true);
}
$(`after, do not evaluate (infinite loop)`);
`````

## Globals

None

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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
