# Preval test case

# fence_at_loop_switch.md

> Normalize > Dce > Break > Fence at loop switch
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

## Pre Normal

`````js filename=intro
while ($(true)) {
  $('loop');
  {
    const tmpSwitchValue = $(true, 'dis');
    let tmpSwitchCaseToStart = 1;
    if ($(true, 'case') === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        $('case');
        break tmpSwitchBreak;
        $('fail');
      }
      if (tmpSwitchCaseToStart <= 1) {
        $('do not visit, default');
        break tmpSwitchBreak;
        $('fail');
      }
    }
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
    const tmpSwitchValue = $(true, 'dis');
    let tmpSwitchCaseToStart = 1;
    const tmpBinLhs = $(true, 'case');
    const tmpIfTest$1 = tmpBinLhs === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 0;
    }
    tmpSwitchBreak: {
      const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
      if (tmpIfTest$3) {
        $('case');
        break tmpSwitchBreak;
      } else {
        const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
        if (tmpIfTest$5) {
          $('do not visit, default');
          break tmpSwitchBreak;
        }
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
    const tmpSwitchValue = $(true, 'dis');
    let tmpSwitchCaseToStart = 1;
    const tmpBinLhs = $(true, 'case');
    const tmpIfTest$1 = tmpBinLhs === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 0;
    }
    tmpSwitchBreak: {
      const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
      if (tmpIfTest$3) {
        $('case');
        break tmpSwitchBreak;
      } else {
        const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
        if (tmpIfTest$5) {
          $('do not visit, default');
          break tmpSwitchBreak;
        }
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
