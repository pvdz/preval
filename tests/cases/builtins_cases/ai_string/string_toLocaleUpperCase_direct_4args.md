# Preval test case

# string_toLocaleUpperCase_direct_4args.md

> Builtins cases > Ai string > String toLocaleUpperCase direct 4args
>
> Test String.prototype.toLocaleUpperCase called directly with 4 arguments (extra arguments ignored)

## Input

`````js filename=intro
const str = $("hello");
const result = str.toLocaleUpperCase("en-US", 1, 2, 3);
$(result); // Expected: "HELLO"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello`);
const tmpMCF /*:unknown*/ = str.toLocaleUpperCase;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `toLocaleUpperCase`, `en-US`, 1, 2, 3);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
$(str.toLocaleUpperCase(`en-US`, 1, 2, 3));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = a.toLocaleUpperCase;
const c = $dotCall( b, a, "toLocaleUpperCase", "en-US", 1, 2, 3 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello`);
const tmpMCF = str.toLocaleUpperCase;
const result = $dotCall(tmpMCF, str, `toLocaleUpperCase`, `en-US`, 1, 2, 3);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'HELLO'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
