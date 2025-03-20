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
