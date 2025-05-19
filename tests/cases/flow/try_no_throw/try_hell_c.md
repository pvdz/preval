# Preval test case

# try_hell_c.md

> Flow > Try no throw > Try hell c
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
try {

} finally {
  x = 1
}
$(x);
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
