# Preval test case

# switch_default3.md

> Normalize > Dce > Return > Switch default3
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
const tmpSwitchValue = $(1, `disc`);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(0);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
const tmpSaooB = tmpSwitchCaseToStart <= 0;
if (tmpSaooB) {
  $(`keep, do not eval`);
  $(undefined);
} else {
  const tmpReturnArg$1 = $(2, `ret`);
  $(tmpReturnArg$1);
}
`````


## Settled


`````js filename=intro
const tmpSwitchValue /*:unknown*/ = $(1, `disc`);
const tmpBinLhs /*:unknown*/ = $(0);
const tmpIfTest /*:boolean*/ = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  $(`keep, do not eval`);
  $(undefined);
} else {
  const tmpReturnArg$1 /*:unknown*/ = $(2, `ret`);
  $(tmpReturnArg$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1, `disc`);
if ($(0) === tmpSwitchValue) {
  $(`keep, do not eval`);
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
const c = b === a;
if (c) {
  $( "keep, do not eval" );
  $( undefined );
}
else {
  const d = $( 2, "ret" );
  $( d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpSwitchValue = $(1, `disc`);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(0);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
const tmpSaooB = tmpSwitchCaseToStart <= 0;
if (tmpSaooB) {
  $(`keep, do not eval`);
  $(undefined);
} else {
  const tmpReturnArg$1 = $(2, `ret`);
  $(tmpReturnArg$1);
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


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
