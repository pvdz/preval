# Preval test case

# string_trimStart_direct_0args.md

> Builtins cases > Ai string > String trimStart direct 0args
>
> Test String.prototype.trimStart called directly with 0 arguments; should trim whitespace from the start

## Input

`````js filename=intro
const str = $("   hello");
const result = str.trimStart();
$(result); // Expected: "hello"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`   hello`);
const tmpMCF /*:unknown*/ = str.trimStart;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `trimStart`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`   hello`);
$(str.trimStart());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "   hello" );
const b = a.trimStart;
const c = $dotCall( b, a, "trimStart" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`   hello`);
const tmpMCF = str.trimStart;
const result = $dotCall(tmpMCF, str, `trimStart`);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ' hello'
 - 2: 'hello'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
