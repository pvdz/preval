# Preval test case

# string_fromCodePoint_call_ctx_4args.md

> Builtins cases > Ai string > String fromCodePoint call ctx 4args
>
> Test String.fromCodePoint called with .call and 4 arguments (four code points), using a context value (should be ignored)

## Input

`````js filename=intro
const ctx = {qux: 4};
const result = String.fromCodePoint.call(ctx, 0x1F60F, 0x1F610, 0x1F611, 0x1F612);
$(result); // Expected: "\u{1F60F}\u{1F610}\u{1F611}\u{1F612}" (smirk + neutral + expressionless + unamused)
`````


## Settled


`````js filename=intro
$(`\ud83d\ude0f\ud83d\ude10\ud83d\ude11\ud83d\ude12`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`\ud83d\ude0f\ud83d\ude10\ud83d\ude11\ud83d\ude12`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "\ud83d\ude0f\ud83d\ude10\ud83d\ude11\ud83d\ude12" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = { qux: 4 };
const tmpMCOO = $String_fromCodePoint;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, 128527, 128528, 128529, 128530);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '😏😐😑😒'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
