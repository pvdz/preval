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
      continue;
    default:
      continue;
  }
  $('eliminate');
}
$('after, do not evaluate (infinite loop)');
`````

## Normalized

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpSwitchTest = $(1, 'disc');
    {
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
          continue;
        }
      }
      {
        continue;
      }
    }
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

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
