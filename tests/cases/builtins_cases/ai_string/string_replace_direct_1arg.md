# Preval test case

# string_replace_direct_1arg.md

> Builtins cases > Ai string > String replace direct 1arg
>
> Test String.prototype.replace called directly with 1 argument (pattern only)

## Input

`````js filename=intro
const str = $("hello");
const result = str.replace("l");
$(result); // Expected: "hello"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello`);
const tmpMCF /*:unknown*/ = str.replace;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `replace`, `l`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
$(str.replace(`l`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = a.replace;
const c = $dotCall( b, a, "replace", "l" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello`);
const tmpMCF = str.replace;
const result = $dotCall(tmpMCF, str, `replace`, `l`);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'heundefinedlo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
