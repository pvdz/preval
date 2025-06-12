# Preval test case

# string_toLocaleUpperCase_spread_first.md

> Builtins cases > Ai string > String toLocaleUpperCase spread first
>
> Test String.prototype.toLocaleUpperCase called with spread arguments (array with 1 element)

## Input

`````js filename=intro
const str = $("hello");
const args = ["en-US"];
const result = str.toLocaleUpperCase(...args);
$(result); // Expected: "HELLO"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello`);
const tmpMCF /*:unknown*/ = str.toLocaleUpperCase;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `toLocaleUpperCase`, `en-US`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
$(str.toLocaleUpperCase(`en-US`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = a.toLocaleUpperCase;
const c = $dotCall( b, a, "toLocaleUpperCase", "en-US" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello`);
const args = [`en-US`];
const tmpMCF = str.toLocaleUpperCase;
const result = $dotCall(tmpMCF, str, `toLocaleUpperCase`, ...args);
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
