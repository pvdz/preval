# Preval test case

# string_constructor_direct_4args.md

> Builtins cases > Ai string > String constructor direct 4args
>
> Test String() called directly with four arguments

## Input

`````js filename=intro
$(String(123, 456, 789, 0));
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
const tmpArgOverflow = 123;
let tmpCalleeParam = $coerce(tmpArgOverflow, `string`);
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
