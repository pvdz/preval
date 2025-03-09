# Preval test case

# switch_case.md

> Normalize > Dce > Continue > Switch case
>
> Any statements that follow a return in the same parent should be eliminated.

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

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(1, `disc`);
    $(1, `case`);
    const tmpIfTest$1 /*:unknown*/ = $(true);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
  $(`after, do not evaluate (infinite loop)`);
} else {
  $(`after, do not evaluate (infinite loop)`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  while (true) {
    $(1, `disc`);
    $(1, `case`);
    if (!$(true)) {
      break;
    }
  }
  $(`after, do not evaluate (infinite loop)`);
} else {
  $(`after, do not evaluate (infinite loop)`);
}
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
while (true) {
  const tmpIfTest = $(true);
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
  } else {
    break;
  }
}
$(`after, do not evaluate (infinite loop)`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1, "disc" );
    $( 1, "case" );
    const b = $( true );
    if (b) {

    }
    else {
      break;
    }
  }
  $( "after, do not evaluate (infinite loop)" );
}
else {
  $( "after, do not evaluate (infinite loop)" );
}
`````

## Globals

None

## Runtime Outcome

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

Post settled calls: Same

Denormalized calls: Same
