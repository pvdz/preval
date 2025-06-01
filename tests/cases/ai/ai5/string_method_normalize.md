# Preval test case

# string_method_normalize.md

> Ai > Ai5 > String method normalize
>
> Test normalization of string methods to direct operations

## Input

`````js filename=intro
const str = "hello";
const upper = str.toUpperCase();
$(upper);

// Expected:
// const str = "hello";
// const upper = "HELLO";
// $(upper);
`````


## Settled


`````js filename=intro
$(`HELLO`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`HELLO`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "HELLO" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = `hello`;
const tmpMCF = str.toUpperCase;
const upper = $dotCall(tmpMCF, str, `toUpperCase`);
$(upper);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_toUpperCase


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'HELLO'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
