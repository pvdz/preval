# Preval test case

# string_isWellFormed_spread_second_4args.md

> Builtins cases > Ai string > String isWellFormed spread second 4args
>
> Test String.prototype.isWellFormed called with spread arguments as second argument (4 elements, all ignored)

## Input

`````js filename=intro
const str = $("hello");
const arg1 = 1;
const extra = [2, 3, 4, 5];
const result = str.isWellFormed(arg1, ...extra);
$(result); // Expected: true
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello`);
const tmpMCF /*:unknown*/ = str.isWellFormed;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `isWellFormed`, 1, 2, 3, 4, 5);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
$(str.isWellFormed(1, 2, 3, 4, 5));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = a.isWellFormed;
const c = $dotCall( b, a, "isWellFormed", 1, 2, 3, 4, 5 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello`);
const arg1 = 1;
const extra = [2, 3, 4, 5];
const tmpMCF = str.isWellFormed;
const result = $dotCall(tmpMCF, str, `isWellFormed`, arg1, ...extra);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
