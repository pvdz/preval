# Preval test case

# string_replaceAll_direct_3args.md

> Builtins cases > Ai string > String replaceAll direct 3args
>
> Test String.prototype.replaceAll called directly with 3 arguments (extra argument ignored)

## Input

`````js filename=intro
const str = $("hello");
const result = str.replaceAll("l", "x", 99);
$(result); // Expected: "hexxo"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello`);
const tmpMCF /*:unknown*/ = str.replaceAll;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `replaceAll`, `l`, `x`, 99);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
$(str.replaceAll(`l`, `x`, 99));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = a.replaceAll;
const c = $dotCall( b, a, "replaceAll", "l", "x", 99 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello`);
const tmpMCF = str.replaceAll;
const result = $dotCall(tmpMCF, str, `replaceAll`, `l`, `x`, 99);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'hexxo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
