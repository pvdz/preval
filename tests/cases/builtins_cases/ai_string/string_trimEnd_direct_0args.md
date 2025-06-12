# Preval test case

# string_trimEnd_direct_0args.md

> Builtins cases > Ai string > String trimEnd direct 0args
>
> Test String.prototype.trimEnd called directly with 0 arguments; should trim whitespace from the end

## Input

`````js filename=intro
const str = $("hello   ");
const result = str.trimEnd();
$(result); // Expected: "hello"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello   `);
const tmpMCF /*:unknown*/ = str.trimEnd;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `trimEnd`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello   `);
$(str.trimEnd());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello   " );
const b = a.trimEnd;
const c = $dotCall( b, a, "trimEnd" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello   `);
const tmpMCF = str.trimEnd;
const result = $dotCall(tmpMCF, str, `trimEnd`);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello '
 - 2: 'hello'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
