# Preval test case

# switch_case1.md

> Normalize > Dce > Return > Switch case1
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(1, 'case'):
      return $(2, 'ret');
  }
  $('keep, do not eval');
}
$(f());
`````

## Settled


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
const tmpSwitchDisc /*:unknown*/ = $(1, `disc`);
const tmpBinBothRhs /*:unknown*/ = $(1, `case`);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpReturnArg /*:unknown*/ = $(2, `ret`);
  tmpCalleeParam = tmpReturnArg;
} else {
  $(`keep, do not eval`);
}
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = undefined;
if ($(1, `disc`) === $(1, `case`)) {
  tmpCalleeParam = $(2, `ret`);
} else {
  $(`keep, do not eval`);
}
$(tmpCalleeParam);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  tmpSwitchBreak: {
    const tmpSwitchDisc = $(1, `disc`);
    if (tmpSwitchDisc === $(1, `case`)) {
      return $(2, `ret`);
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
let a = undefined;
const b = $( 1, "disc" );
const c = $( 1, "case" );
const d = b === c;
if (d) {
  const e = $( 2, "ret" );
  a = e;
}
else {
  $( "keep, do not eval" );
}
$( a );
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
