# Preval test case

# switch_default1.md

> Normalize > Dce > Continue > Switch default1
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

## Pre Normal


`````js filename=intro
while ($(true)) {
  $continue: {
    {
      tmpSwitchBreak: {
        const tmpSwitchDisc = $(1, `disc`);
        if (tmpSwitchDisc === $(0)) {
          $(`keep, do not eval`);
          break $continue;
        } else if (true) {
          break $continue;
        } else {
        }
      }
      $(`eliminate`);
    }
  }
}
$(`after, do not evaluate (infinite loop)`);
`````

## Normalized


`````js filename=intro
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    $continue: {
      const tmpSwitchDisc = $(1, `disc`);
      const tmpBinBothLhs = tmpSwitchDisc;
      const tmpBinBothRhs = $(0);
      const tmpIfTest$1 = tmpBinBothLhs === tmpBinBothRhs;
      if (tmpIfTest$1) {
        $(`keep, do not eval`);
        break $continue;
      } else {
        break $continue;
      }
    }
    tmpIfTest = $(true);
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
  const tmpIfTest$1 = tmpSwitchDisc === tmpBinBothRhs;
  if (tmpIfTest$1) {
    $(`keep, do not eval`);
  } else {
  }
  let tmpClusterSSA_tmpIfTest = $(true);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      const tmpSwitchDisc$1 = $(1, `disc`);
      const tmpBinBothRhs$1 = $(0);
      const tmpIfTest$2 = tmpSwitchDisc$1 === tmpBinBothRhs$1;
      if (tmpIfTest$2) {
        $(`keep, do not eval`);
      } else {
      }
      tmpClusterSSA_tmpIfTest = $(true);
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
  let e = $( true );
  while ($LOOP_UNROLL_10) {
    if (e) {
      const f = $( 1, "disc" );
      const g = $( 0 );
      const h = f === g;
      if (h) {
        $( "keep, do not eval" );
      }
      e = $( true );
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
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
