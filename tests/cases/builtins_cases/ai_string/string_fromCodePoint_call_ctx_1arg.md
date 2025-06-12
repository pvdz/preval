# Preval test case

# string_fromCodePoint_call_ctx_1arg.md

> Builtins cases > Ai string > String fromCodePoint call ctx 1arg
>
> Test String.fromCodePoint called with .call and 1 argument (single code point), using a context value (should be ignored)

## Input

`````js filename=intro
const ctx = {foo: 1};
const result = String.fromCodePoint.call(ctx, 0x1F609);
$(result); // Expected: "\u{1F609}" (winking face)
`````


## Settled


`````js filename=intro
$(`\ud83d\ude09`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`\ud83d\ude09`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "\ud83d\ude09" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = { foo: 1 };
const tmpMCOO = $String_fromCodePoint;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, 128521);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '😉'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
