# Preval test case

# switch_default1.md

> Normalize > Dce > Return > Switch default1
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('keep, do not eval');
      return;
    default:
      return $(2, 'ret');
  }
  $('fail');
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
  const tmpReturnArg /*:unknown*/ = $(2, `ret`);
  $(tmpReturnArg);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1, `disc`) === $(0)) {
  $(`keep, do not eval`);
  $(undefined);
} else {
  $($(2, `ret`));
}
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
    } else if (true) {
      return $(2, `ret`);
    } else {
    }
  }
  $(`fail`);
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
    const tmpReturnArg = $(2, `ret`);
    return tmpReturnArg;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
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
  const d = $( 2, "ret" );
  $( d );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1, 'disc'
 - 2: 0
 - 3: 2, 'ret'
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
