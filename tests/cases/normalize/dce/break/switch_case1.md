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
        const tmpBinBothRhs = $(1, 'case');
        tmpIfTest$1 = tmpBinBothLhs === tmpBinBothRhs;
      }
      if (tmpIfTest$1) {
        {
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
'<skipped>';
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

Final output calls: BAD!!
 - eval returned: undefined
