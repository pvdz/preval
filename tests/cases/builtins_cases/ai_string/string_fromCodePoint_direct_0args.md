# Preval test case

# string_fromCodePoint_direct_0args.md

> Builtins cases > Ai string > String fromCodePoint direct 0args
>
> Test String.fromCodePoint called directly with 0 arguments; should return an empty string

## Input

`````js filename=intro
const result = String.fromCodePoint();
$(result); // Expected: ""
`````


## Settled


`````js filename=intro
$(``);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(``);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $String_fromCodePoint;
const result = ``;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
