# Preval test case

# string_fromCodePoint_call_ctx_2args.md

> Builtins cases > Ai string > String fromCodePoint call ctx 2args
>
> Test String.fromCodePoint called with .call and 2 arguments (two code points), using a context value (should be ignored)

## Input

`````js filename=intro
const ctx = {bar: 2};
const result = String.fromCodePoint.call(ctx, 0x1F60A, 0x1F60B);
$(result); // Expected: "\u{1F60A}\u{1F60B}" (smiling face + face savoring food)
`````


## Settled


`````js filename=intro
$(`\ud83d\ude0a\ud83d\ude0b`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`\ud83d\ude0a\ud83d\ude0b`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "\ud83d\ude0a\ud83d\ude0b" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = { bar: 2 };
const tmpMCOO = $String_fromCodePoint;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, 128522, 128523);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '😊😋'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
