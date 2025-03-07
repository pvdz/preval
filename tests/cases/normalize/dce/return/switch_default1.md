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
let tmpCalleeParam /*:unknown*/ = undefined;
const tmpSwitchDisc /*:unknown*/ = $(1, `disc`);
const tmpBinBothRhs /*:unknown*/ = $(0);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(`keep, do not eval`);
} else {
  const tmpReturnArg /*:unknown*/ = $(2, `ret`);
  tmpCalleeParam = tmpReturnArg;
}
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = undefined;
if ($(1, `disc`) === $(0)) {
  $(`keep, do not eval`);
} else {
  tmpCalleeParam = $(2, `ret`);
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
let a = undefined;
const b = $( 1, "disc" );
const c = $( 0 );
const d = b === c;
if (d) {
  $( "keep, do not eval" );
}
else {
  const e = $( 2, "ret" );
  a = e;
}
$( a );
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
