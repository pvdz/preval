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
  $(`loop`);
  tmpSwitchBreak: {
    const tmpSwitchDisc = $(true, `dis`);
    if (tmpSwitchDisc === $(true, `case`)) {
      $(`case`);
      break tmpSwitchBreak;
      $(`fail`);
    } else if (true) {
      $(`do not visit, default`);
      break tmpSwitchBreak;
      $(`fail`);
    } else {
    }
  }
  $(`infiloop, do not eliminate`);
}
$(`after (not invoked)`);
`````

## Normalized

`````js filename=intro
let tmpIfTest = $(true);
while (tmpIfTest) {
  $(`loop`);
  tmpSwitchBreak: {
    const tmpSwitchDisc = $(true, `dis`);
    const tmpBinBothLhs = tmpSwitchDisc;
    const tmpBinBothRhs = $(true, `case`);
    const tmpIfTest$1 = tmpBinBothLhs === tmpBinBothRhs;
    if (tmpIfTest$1) {
      $(`case`);
      break tmpSwitchBreak;
    } else {
      $(`do not visit, default`);
      break tmpSwitchBreak;
    }
  }
  $(`infiloop, do not eliminate`);
  tmpIfTest = $(true);
}
$(`after (not invoked)`);
`````

## Output

`````js filename=intro
let tmpIfTest = $(true);
while (tmpIfTest) {
  $(`loop`);
  const tmpSwitchDisc = $(true, `dis`);
  const tmpBinBothRhs = $(true, `case`);
  const tmpIfTest$1 = tmpSwitchDisc === tmpBinBothRhs;
  if (tmpIfTest$1) {
    $(`case`);
  } else {
    $(`do not visit, default`);
  }
  $(`infiloop, do not eliminate`);
  tmpIfTest = $(true);
}
$(`after (not invoked)`);
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
