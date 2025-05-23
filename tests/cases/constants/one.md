# Preval test case

# one.md

> Constants > One
>
> Single constant, nothing happens

## Input

`````js filename=intro
const foo = "five";
$(foo)
`````


## Settled


`````js filename=intro
$(`five`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`five`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "five" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const foo = `five`;
$(foo);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'five'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
