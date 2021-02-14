# Preval test case

# fence_at_loop.md

> normalize > dce > continue > fence_at_loop
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

Only relevant for the switch that returns or throws in all cases and has a default that also returns or throws.

In other case the statements following a switch may be visited so DCE would not apply to them.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  $('loop');
  
  switch ($(true, 'dis')) {
    case $(true, 'case'):
      $('case');
      break;
      $('fail');
    default:
      $('do not visit, default');
      break;
      $('fail');
  }

  $('infiloop, do not eliminate');
}
$('after (not invoked)');
`````

## Normalized

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $('loop');
    const tmpSwitchTest = $(true, 'dis');
    const tmpSwitchValue = tmpSwitchTest;
    let tmpSwitchCaseToStart = 1;
    const tmpBinLhs = $(true, 'case');
    const tmpIfTest$1 = tmpBinLhs === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 0;
    }
    tmpSwitchBreak: {
      const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
      if (tmpIfTest$2) {
        $('case');
        break tmpSwitchBreak;
      }
      const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
      if (tmpIfTest$3) {
        $('do not visit, default');
        break tmpSwitchBreak;
      }
    }
    $('infiloop, do not eliminate');
  } else {
    break;
  }
}
$('after (not invoked)');
`````

## Output

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $('loop');
    const tmpSwitchTest = $(true, 'dis');
    let tmpSwitchCaseToStart = 1;
    const tmpBinLhs = $(true, 'case');
    const tmpIfTest$1 = tmpBinLhs === tmpSwitchTest;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 0;
    }
    tmpSwitchBreak: {
      const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
      if (tmpIfTest$2) {
        $('case');
        break tmpSwitchBreak;
      }
      const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
      if (tmpIfTest$3) {
        $('do not visit, default');
        break tmpSwitchBreak;
      }
    }
    $('infiloop, do not eliminate');
  } else {
    break;
  }
}
$('after (not invoked)');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: true, 'dis'
 - 4: true, 'case'
 - 5: 'case'
 - 6: 'infiloop, do not eliminate'
 - 7: true
 - 8: 'loop'
 - 9: true, 'dis'
 - 10: true, 'case'
 - 11: 'case'
 - 12: 'infiloop, do not eliminate'
 - 13: true
 - 14: 'loop'
 - 15: true, 'dis'
 - 16: true, 'case'
 - 17: 'case'
 - 18: 'infiloop, do not eliminate'
 - 19: true
 - 20: 'loop'
 - 21: true, 'dis'
 - 22: true, 'case'
 - 23: 'case'
 - 24: 'infiloop, do not eliminate'
 - 25: true
 - 26: 'loop'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
