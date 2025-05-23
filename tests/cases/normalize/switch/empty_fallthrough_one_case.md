# Preval test case

# empty_fallthrough_one_case.md

> Normalize > Switch > Empty fallthrough one case
>
> Do cases spy

## Input

`````js filename=intro
switch ($(1)) {
  case $spy(0):
}
$();
`````


## Settled


`````js filename=intro
$(1);
$spy(0);
$();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$spy(0);
$();
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$spy( 0 );
$();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $spy(0);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
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
 - 3: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
