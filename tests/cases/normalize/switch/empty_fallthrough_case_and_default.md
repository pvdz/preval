# Preval test case

# empty_fallthrough_case_and_default.md

> Normalize > Switch > Empty fallthrough case and default
>
> Do cases spy

## Input

`````js filename=intro
switch ($(1)) {
  case $spy(0):
  default:
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
