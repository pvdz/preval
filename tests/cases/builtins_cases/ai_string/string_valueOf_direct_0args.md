# Preval test case

# string_valueOf_direct_0args.md

> Builtins cases > Ai string > String valueOf direct 0args
>
> Test String.prototype.valueOf called directly with 0 arguments; should return the primitive string value

## Input

`````js filename=intro
const str = $("hello");
const result = str.valueOf();
$(result); // Expected: "hello"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello`);
const tmpMCF /*:unknown*/ = str.valueOf;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `valueOf`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
$(str.valueOf());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = a.valueOf;
const c = $dotCall( b, a, "valueOf" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello`);
const tmpMCF = str.valueOf;
const result = $dotCall(tmpMCF, str, `valueOf`);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'hello'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
