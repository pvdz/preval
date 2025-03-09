# Preval test case

# switch_case2.md

> Normalize > Dce > Return > Switch case2
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(1, 'case'):
      return $(2, 'ret');
      $('fail');
  }
  $('keep, do not eval');
}
$(f());
`````

## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1, `disc`);
const tmpBinBothRhs /*:unknown*/ = $(1, `case`);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpReturnArg /*:unknown*/ = $(2, `ret`);
  $(tmpReturnArg);
} else {
  $(`keep, do not eval`);
  $(undefined);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1, `disc`) === $(1, `case`)) {
  $($(2, `ret`));
} else {
  $(`keep, do not eval`);
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  tmpSwitchBreak: {
    const tmpSwitchDisc = $(1, `disc`);
    if (tmpSwitchDisc === $(1, `case`)) {
      return $(2, `ret`);
      $(`fail`);
    } else {
    }
  }
  $(`keep, do not eval`);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpSwitchDisc = $(1, `disc`);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(1, `case`);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    const tmpReturnArg = $(2, `ret`);
    return tmpReturnArg;
  } else {
    $(`keep, do not eval`);
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1, "disc" );
const b = $( 1, "case" );
const c = a === b;
if (c) {
  const d = $( 2, "ret" );
  $( d );
}
else {
  $( "keep, do not eval" );
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1, 'disc'
 - 2: 1, 'case'
 - 3: 2, 'ret'
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
