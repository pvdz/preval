# Preval test case

# string_constructor_direct_1arg.md

> Builtins cases > Ai string > String constructor direct 1arg
>
> Test String() called directly with one argument

## Input

`````js filename=intro
$(String(123));
// Expected: "123"
`````


## Settled


`````js filename=intro
$(`123`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`123`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "123" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $coerce(123, `string`);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '123'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
