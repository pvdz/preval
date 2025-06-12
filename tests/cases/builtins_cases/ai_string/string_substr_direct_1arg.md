# Preval test case

# string_substr_direct_1arg.md

> Builtins cases > Ai string > String substr direct 1arg
>
> Test String.prototype.substr called directly with 1 argument (start)

## Input

`````js filename=intro
const str = $("hello");
const result = str.substr(2);
$(result); // Expected: "llo"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello`);
const tmpMCF /*:unknown*/ = str.substr;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `substr`, 2);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
$(str.substr(2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = a.substr;
const c = $dotCall( b, a, "substr", 2 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello`);
const tmpMCF = str.substr;
const result = $dotCall(tmpMCF, str, `substr`, 2);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'llo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
