# Preval test case

# string_fromCodePoint_call_ctx_3args.md

> Builtins cases > Ai string > String fromCodePoint call ctx 3args
>
> Test String.fromCodePoint called with .call and 3 arguments (three code points), using a context value (should be ignored)

## Input

`````js filename=intro
const ctx = {baz: 3};
const result = String.fromCodePoint.call(ctx, 0x1F60C, 0x1F60D, 0x1F60E);
$(result); // Expected: "\u{1F60C}\u{1F60D}\u{1F60E}" (relieved face + heart eyes + sunglasses)
`````


## Settled


`````js filename=intro
$(`\ud83d\ude0c\ud83d\ude0d\ud83d\ude0e`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`\ud83d\ude0c\ud83d\ude0d\ud83d\ude0e`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "\ud83d\ude0c\ud83d\ude0d\ud83d\ude0e" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = { baz: 3 };
const tmpMCOO = $String_fromCodePoint;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, 128524, 128525, 128526);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '😌😍😎'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
