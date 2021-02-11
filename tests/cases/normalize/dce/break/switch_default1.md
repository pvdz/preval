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
    case $(0):
      $('keep, do not eval');
      break;
    default:
      break;
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
    tmpSwitchBreak: {
      let tmpFallthrough = false;
      let tmpIfTest$1 = tmpFallthrough;
      if (tmpIfTest$1) {
      } else {
        const tmpBinBothLhs = tmpSwitchTest;
        const tmpBinBothRhs = $(0);
        tmpIfTest$1 = tmpBinBothLhs === tmpBinBothRhs;
      }
      if (tmpIfTest$1) {
        {
          $('keep, do not eval');
          break tmpSwitchBreak;
        }
      }
      {
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
'<skipped>';
`````

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

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
