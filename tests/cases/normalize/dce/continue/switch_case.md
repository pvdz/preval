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
      continue;
      $('fail');
  }
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
        const tmpBinBothRhs = $(1, 'case');
        tmpIfTest$1 = tmpBinBothLhs === tmpBinBothRhs;
      }
      if (tmpIfTest$1) {
        {
          continue;
        }
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

Final output calls: BAD!!
 - eval returned: undefined
