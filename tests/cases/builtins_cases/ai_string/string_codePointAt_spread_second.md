# Preval test case

# string_codePointAt_spread_second.md

> Builtins cases > Ai string > String codePointAt spread second
>
> Test String.prototype.codePointAt called directly with spread as second argument (3 values)

## Input

`````js filename=intro
const str = $("hello world");
const arg1 = 6;
const args = ["extra", "extra2", "extra3"];
const result = str.codePointAt(arg1, ...args);
$(result); // Expected: 119
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.codePointAt;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `codePointAt`, 6, `extra`, `extra2`, `extra3`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.codePointAt(6, `extra`, `extra2`, `extra3`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.codePointAt;
const c = $dotCall( b, a, "codePointAt", 6, "extra", "extra2", "extra3" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const arg1 = 6;
const args = [`extra`, `extra2`, `extra3`];
const tmpMCF = str.codePointAt;
const result = $dotCall(tmpMCF, str, `codePointAt`, arg1, ...args);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: 119
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
