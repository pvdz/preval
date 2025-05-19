# Preval test case

# try_hell_arrow.md

> Flow > Try catch throw early > Try hell arrow
>
> Just trying to trip an arrow case

## Input

`````js filename=intro
let x = 0;
const f = () => {
  foo: {
    try {
      throw 'not me';
    } finally {
      return
    }
  }
}
f();
$(x);
`````


## Settled


`````js filename=intro
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
