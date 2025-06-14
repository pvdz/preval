# Preval test case

# switch_default1.md

> Normalize > Dce > Throw > Switch default1
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('keep, do not eval');
      throw 'wrong exig';
    default:
      throw $(2, 'ret');
  }
  $('fail');
}
$(f());
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1, `disc`);
const tmpBinBothRhs /*:unknown*/ = $(0);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  $(`keep, do not eval`);
  throw `wrong exig`;
} else {
  const tmpThrowArg /*:unknown*/ = $(2, `ret`);
  throw tmpThrowArg;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1, `disc`) === $(0)) {
  $(`keep, do not eval`);
  throw `wrong exig`;
} else {
  const tmpThrowArg = $(2, `ret`);
  throw tmpThrowArg;
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
  throw "wrong exig";
}
else {
  const d = $( 2, "ret" );
  throw d;
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
    throw `wrong exig`;
  } else {
    const tmpThrowArg = $(2, `ret`);
    throw tmpThrowArg;
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
 - 3: 2, 'ret'
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
