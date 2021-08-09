# Preval test case

# switch_default.md

> Normalize > Dce > Break > Switch default
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  switch ($(1, 'disc')) {
    case $(0):
      $('wrong branch');
      break;
    default:
      break;
      $('fail');
  }
}
$('after, do not evaluate (infinite loop)');
`````

## Pre Normal

`````js filename=intro
while ($(true)) {
  tmpSwitchBreak: {
    const tmpSwitchDisc = $(1, `disc`);
    if (tmpSwitchDisc === $(0)) {
      $(`wrong branch`);
      break tmpSwitchBreak;
    } else if (true) {
      break tmpSwitchBreak;
      $(`fail`);
    } else {
    }
  }
}
$(`after, do not evaluate (infinite loop)`);
`````

## Normalized

`````js filename=intro
let tmpIfTest = $(true);
while (tmpIfTest) {
  tmpSwitchBreak: {
    const tmpSwitchDisc = $(1, `disc`);
    const tmpBinBothLhs = tmpSwitchDisc;
    const tmpBinBothRhs = $(0);
    const tmpIfTest$1 = tmpBinBothLhs === tmpBinBothRhs;
    if (tmpIfTest$1) {
      $(`wrong branch`);
      break tmpSwitchBreak;
    } else {
      break tmpSwitchBreak;
    }
  }
  tmpIfTest = $(true);
}
$(`after, do not evaluate (infinite loop)`);
`````

## Output

`````js filename=intro
let tmpIfTest = $(true);
while (tmpIfTest) {
  const tmpSwitchDisc = $(1, `disc`);
  const tmpBinBothRhs = $(0);
  const tmpIfTest$1 = tmpSwitchDisc === tmpBinBothRhs;
  if (tmpIfTest$1) {
    $(`wrong branch`);
  } else {
  }
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
