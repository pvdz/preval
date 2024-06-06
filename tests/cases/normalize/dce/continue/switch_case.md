# Preval test case

# switch_case.md

> Normalize > Dce > Continue > Switch case
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

## Pre Normal


`````js filename=intro
while ($(true)) {
  tmpSwitchBreak: {
    const tmpSwitchDisc = $(1, `disc`);
    if (tmpSwitchDisc === $(1, `case`)) {
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
while (true) {
  if (tmpIfTest) {
    tmpSwitchBreak: {
      const tmpSwitchDisc = $(1, `disc`);
      const tmpBinBothLhs = tmpSwitchDisc;
      const tmpBinBothRhs = $(1, `case`);
      const tmpIfTest$1 = tmpBinBothLhs === tmpBinBothRhs;
      if (tmpIfTest$1) {
        break tmpSwitchBreak;
      } else {
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
  $(1, `disc`);
  $(1, `case`);
  let tmpClusterSSA_tmpIfTest = $(true);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      $(1, `disc`);
      $(1, `case`);
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
  $( 1, "disc" );
  $( 1, "case" );
  let b = $( true );
  while ($LOOP_UNROLL_10) {
    if (b) {
      $( 1, "disc" );
      $( 1, "case" );
      b = $( true );
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
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
