# Preval test case

# switch_default.md

> Normalize > Dce > Return > Switch default
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('wrong branch');
      return;
    default:
      return $(2, 'ret');
      $('fail');
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1, `disc`);
const tmpBinBothRhs /*:unknown*/ = $(0);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(`wrong branch`);
  $(undefined);
} else {
  const tmpCalleeParam /*:unknown*/ = $(2, `ret`);
  $(tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1, `disc`) === $(0)) {
  $(`wrong branch`);
  $(undefined);
} else {
  $($(2, `ret`));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1, "disc" );
const b = $( 0 );
const c = a === b;
if (c) {
  $( "wrong branch" );
  $( undefined );
}
else {
  const d = $( 2, "ret" );
  $( d );
}
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
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
