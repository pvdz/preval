# Preval test case

# switch_default2.md

> Normalize > Dce > Break > Switch default2
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
while ($(true)) {
  switch ($(1, 'disc')) {
    case $(0):
      $('keep, do not eval');
      break;
    default:
      break;
      $('fail');
  }
  $('keep');
}
$('after, do not evaluate (infinite loop)');
`````

## Pre Normal


`````js filename=intro
while ($(true)) {
  tmpSwitchBreak: {
    const tmpSwitchDisc = $(1, `disc`);
    if (tmpSwitchDisc === $(0)) {
      $(`keep, do not eval`);
      break tmpSwitchBreak;
    } else if (true) {
      break tmpSwitchBreak;
      $(`fail`);
    } else {
    }
  }
  $(`keep`);
}
$(`after, do not evaluate (infinite loop)`);
`````

## Normalized


`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    tmpSwitchBreak: {
      const tmpSwitchDisc = $(1, `disc`);
      const tmpBinBothLhs = tmpSwitchDisc;
      const tmpBinBothRhs = $(0);
      const tmpIfTest$1 = tmpBinBothLhs === tmpBinBothRhs;
      if (tmpIfTest$1) {
        $(`keep, do not eval`);
        break tmpSwitchBreak;
      } else {
        break tmpSwitchBreak;
      }
    }
    $(`keep`);
  } else {
    break;
  }
}
$(`after, do not evaluate (infinite loop)`);
`````

## Output


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpSwitchDisc = $(1, `disc`);
  const tmpBinBothRhs = $(0);
  const tmpIfTest$1 /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
  if (tmpIfTest$1) {
    $(`keep, do not eval`);
  } else {
  }
  while ($LOOP_UNROLL_10) {
    $(`keep`);
    const tmpIfTest$2 = $(true);
    if (tmpIfTest$2) {
      const tmpSwitchDisc$1 = $(1, `disc`);
      const tmpBinBothRhs$1 = $(0);
      const tmpIfTest$4 /*:boolean*/ = tmpSwitchDisc$1 === tmpBinBothRhs$1;
      if (tmpIfTest$4) {
        $(`keep, do not eval`);
      } else {
      }
    } else {
      break;
    }
  }
} else {
}
$(`after, do not evaluate (infinite loop)`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( 1, "disc" );
  const c = $( 0 );
  const d = b === c;
  if (d) {
    $( "keep, do not eval" );
  }
  while ($LOOP_UNROLL_10) {
    $( "keep" );
    const e = $( true );
    if (e) {
      const f = $( 1, "disc" );
      const g = $( 0 );
      const h = f === g;
      if (h) {
        $( "keep, do not eval" );
      }
    }
    else {
      break;
    }
  }
}
$( "after, do not evaluate (infinite loop)" );
`````

## Globals

None

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
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
