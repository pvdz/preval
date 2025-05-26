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
const tmpSwitchDisc /*:unknown*/ = $(1, `disc`);
const tmpBinBothRhs /*:unknown*/ = $(0);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(`keep, do not eval`);
  $(undefined);
} else {
  const tmpBinBothRhs$1 /*:unknown*/ = $(1);
  const tmpIfTest$1 /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs$1;
  if (tmpIfTest$1) {
    $(`keep, eval`);
    $(undefined);
  } else {
    $(`keep, do not eval`);
    const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(2, `ret`);
    $(tmpClusterSSA_tmpCalleeParam);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchDisc = $(1, `disc`);
if (tmpSwitchDisc === $(0)) {
  $(`keep, do not eval`);
  $(undefined);
} else {
  if (tmpSwitchDisc === $(1)) {
    $(`keep, eval`);
    $(undefined);
  } else {
    $(`keep, do not eval`);
    $($(2, `ret`));
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1, "disc" );
const b = $( 0 );
const c = a === b;
if (c) {
  $( "keep, do not eval" );
  $( undefined );
}
else {
  const d = $( 1 );
  const e = a === d;
  if (e) {
    $( "keep, eval" );
    $( undefined );
  }
  else {
    $( "keep, do not eval" );
    const f = $( 2, "ret" );
    $( f );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

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
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


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
