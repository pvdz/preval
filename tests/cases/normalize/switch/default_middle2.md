# Preval test case

# default_middle2.md

> Normalize > Switch > Default middle2
>
> Normalize switches

## Input

`````js filename=intro
switch (6) {
  default: 
  case $(30): ;
}
`````


## Settled


`````js filename=intro
$(30);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(30);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 30 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpSwitchValue = 6;
let tmpSwitchCaseToStart = 0;
const tmpBinLhs = $(30);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 1;
} else {
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
