# Preval test case

# switch_case1.md

> Normalize > Dce > Continue > Switch case1
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
while ($(true)) {
  switch ($(1, 'disc')) {
    case $(1, 'case'):
      continue;
  }
  $('keep');
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
        if (tmpSwitchDisc === $(1, `case`)) {
          break $continue;
        } else {
        }
      }
      $(`keep`);
    }
  }
}
$(`after, do not evaluate (infinite loop)`);
`````

## Normalized


`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $continue: {
      const tmpSwitchDisc = $(1, `disc`);
      const tmpBinBothLhs = tmpSwitchDisc;
      const tmpBinBothRhs = $(1, `case`);
      const tmpIfTest$1 = tmpBinBothLhs === tmpBinBothRhs;
      if (tmpIfTest$1) {
        break $continue;
      } else {
        $(`keep`);
      }
    }
  } else {
    break;
  }
}
$(`after, do not evaluate (infinite loop)`);
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpSwitchDisc /*:unknown*/ = $(1, `disc`);
  const tmpBinBothRhs /*:unknown*/ = $(1, `case`);
  const tmpIfTest$1 /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
  if (tmpIfTest$1) {
  } else {
    $(`keep`);
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(true);
    if (tmpIfTest$2) {
      const tmpSwitchDisc$1 /*:unknown*/ = $(1, `disc`);
      const tmpBinBothRhs$1 /*:unknown*/ = $(1, `case`);
      const tmpIfTest$4 /*:boolean*/ = tmpSwitchDisc$1 === tmpBinBothRhs$1;
      if (tmpIfTest$4) {
      } else {
        $(`keep`);
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
  const c = $( 1, "case" );
  const d = b === c;
  if (d) {

  }
  else {
    $( "keep" );
  }
  while ($LOOP_UNROLL_10) {
    const e = $( true );
    if (e) {
      const f = $( 1, "disc" );
      const g = $( 1, "case" );
      const h = f === g;
      if (h) {

      }
      else {
        $( "keep" );
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
