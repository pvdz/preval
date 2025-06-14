# Preval test case

# switch_case1.md

> Normalize > Dce > Throw > Switch case1
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(1, 'case'):
      throw $(2, 'ret');
  }
  $('keep, do not eval');
}
$(f());
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1, `disc`);
const tmpBinBothRhs /*:unknown*/ = $(1, `case`);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpThrowArg /*:unknown*/ = $(2, `ret`);
  throw tmpThrowArg;
} else {
  $(`keep, do not eval`);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1, `disc`) === $(1, `case`)) {
  const tmpThrowArg = $(2, `ret`);
  throw tmpThrowArg;
} else {
  $(`keep, do not eval`);
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1, "disc" );
const b = $( 1, "case" );
const c = a === b;
if (c) {
  const d = $( 2, "ret" );
  throw d;
}
else {
  $( "keep, do not eval" );
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpSwitchDisc = $(1, `disc`);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(1, `case`);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    const tmpThrowArg = $(2, `ret`);
    throw tmpThrowArg;
  } else {
    $(`keep, do not eval`);
    return undefined;
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
 - 2: 1, 'case'
 - 3: 2, 'ret'
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
