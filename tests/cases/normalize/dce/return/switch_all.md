# Preval test case

# switch_all.md

> Normalize > Dce > Return > Switch all
>
> Any statements that follow a return in the same parent should be eliminated.

If all switch cases return, including a default, then the code after a switch is dead code.

Simple case to check whether the switch transform doesn't prevent this.

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('keep, do not eval');
      return;
      $('eliminate');
    case $(1):
      $('keep, eval');
      return;
      $('eliminate');
    default:
      $('keep, do not eval');
      return $(2, 'ret');
      $('eliminate');
  }
  $('eliminate after switch');
}
$(f());
`````

## Settled


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
const tmpSwitchDisc /*:unknown*/ = $(1, `disc`);
const tmpBinBothRhs /*:unknown*/ = $(0);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(`keep, do not eval`);
} else {
  const tmpBinBothRhs$1 /*:unknown*/ = $(1);
  const tmpIfTest$1 /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs$1;
  if (tmpIfTest$1) {
    $(`keep, eval`);
  } else {
    $(`keep, do not eval`);
    const tmpReturnArg /*:unknown*/ = $(2, `ret`);
    tmpCalleeParam = tmpReturnArg;
  }
}
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpSwitchDisc = $(1, `disc`);
if (tmpSwitchDisc === $(0)) {
  $(`keep, do not eval`);
} else {
  if (tmpSwitchDisc === $(1)) {
    $(`keep, eval`);
  } else {
    $(`keep, do not eval`);
    tmpCalleeParam = $(2, `ret`);
  }
}
$(tmpCalleeParam);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  tmpSwitchBreak: {
    const tmpSwitchDisc = $(1, `disc`);
    if (tmpSwitchDisc === $(0)) {
      $(`keep, do not eval`);
      return;
      $(`eliminate`);
    } else if (tmpSwitchDisc === $(1)) {
      $(`keep, eval`);
      return;
      $(`eliminate`);
    } else if (true) {
      $(`keep, do not eval`);
      return $(2, `ret`);
      $(`eliminate`);
    } else {
    }
  }
  $(`eliminate after switch`);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpSwitchDisc = $(1, `disc`);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(0);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    $(`keep, do not eval`);
    return undefined;
  } else {
    const tmpBinBothLhs$1 = tmpSwitchDisc;
    const tmpBinBothRhs$1 = $(1);
    const tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
    if (tmpIfTest$1) {
      $(`keep, eval`);
      return undefined;
    } else {
      $(`keep, do not eval`);
      const tmpReturnArg = $(2, `ret`);
      return tmpReturnArg;
    }
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1, "disc" );
const c = $( 0 );
const d = b === c;
if (d) {
  $( "keep, do not eval" );
}
else {
  const e = $( 1 );
  const f = b === e;
  if (f) {
    $( "keep, eval" );
  }
  else {
    $( "keep, do not eval" );
    const g = $( 2, "ret" );
    a = g;
  }
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1, 'disc'
 - 2: 0
 - 3: 1
 - 4: 'keep, eval'
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
