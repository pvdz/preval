# Preval test case

# switch_case.md

> Normalize > Dce > Throw > Switch case
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(1, 'case'):
      throw $(2, 'ret');
      $('fail');
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1, `disc`);
const tmpBinBothRhs /*:unknown*/ = $(1, `case`);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpThrowArg /*:unknown*/ = $(2, `ret`);
  throw tmpThrowArg;
} else {
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
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
