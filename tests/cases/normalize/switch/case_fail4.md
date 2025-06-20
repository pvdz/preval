# Preval test case

# case_fail4.md

> Normalize > Switch > Case fail4
>
> Do cases spy

## Input

`````js filename=intro
switch ($(1)) {
  case $spy(0):
  case $spy(1):
}
$();
`````


## Settled


`````js filename=intro
const tmpSwitchValue /*:unknown*/ = $(1);
const tmpBinLhs /*:unknown*/ = $spy(0);
const tmpIfTest /*:boolean*/ = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  $();
} else {
  $spy(1);
  $();
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
if ($spy(0) === tmpSwitchValue) {
  $();
} else {
  $spy(1);
  $();
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $spy( 0 );
const c = b === a;
if (c) {
  $();
}
else {
  $spy( 1 );
  $();
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 2;
const tmpBinLhs = $spy(0);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 = $spy(1);
  const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
$();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'Creating spy', 1, 1, [0, 0]
 - 3: 'Creating spy', 2, 1, [1, 1]
 - 4: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
