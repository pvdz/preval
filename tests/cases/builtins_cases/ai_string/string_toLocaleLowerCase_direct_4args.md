# Preval test case

# string_toLocaleLowerCase_direct_4args.md

> Builtins cases > Ai string > String toLocaleLowerCase direct 4args
>
> Test String.prototype.toLocaleLowerCase called directly with 4 arguments (extra arguments ignored)

## Input

`````js filename=intro
const str = $("HELLO");
const result = str.toLocaleLowerCase("en-US", 1, 2, 3);
$(result); // Expected: "hello"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`HELLO`);
const tmpMCF /*:unknown*/ = str.toLocaleLowerCase;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `toLocaleLowerCase`, `en-US`, 1, 2, 3);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`HELLO`);
$(str.toLocaleLowerCase(`en-US`, 1, 2, 3));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "HELLO" );
const b = a.toLocaleLowerCase;
const c = $dotCall( b, a, "toLocaleLowerCase", "en-US", 1, 2, 3 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`HELLO`);
const tmpMCF = str.toLocaleLowerCase;
const result = $dotCall(tmpMCF, str, `toLocaleLowerCase`, `en-US`, 1, 2, 3);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'HELLO'
 - 2: 'hello'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
