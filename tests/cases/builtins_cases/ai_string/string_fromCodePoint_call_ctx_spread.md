# Preval test case

# string_fromCodePoint_call_ctx_spread.md

> Builtins cases > Ai string > String fromCodePoint call ctx spread
>
> Test String.fromCodePoint called with .call, dummy context, and spread as arguments

## Input

`````js filename=intro
const args = [9731, 9733, 9734];
const result = String.fromCodePoint.call(null, ...args);
$(result); // Expected: "\u2603\u2605\u2606"

// Test String.fromCodePoint called with .call and spread arguments (array with 2 elements), using a context value (should be ignored)
const ctx2 = {ignore: true};
const args2 = [0x1F620, 0x1F621];
const result2 = String.fromCodePoint.call(ctx2, ...args2);
$(result2); // Expected: "\u{1F620}\u{1F621}" (angry + pouting)
`````


## Settled


`````js filename=intro
$(`\u2603\u2605\u2606`);
$(`\ud83d\ude20\ud83d\ude21`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`\u2603\u2605\u2606`);
$(`\ud83d\ude20\ud83d\ude21`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "\u2603\u2605\u2606" );
$( "\ud83d\ude20\ud83d\ude21" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const args = [9731, 9733, 9734];
const tmpMCOO = $String_fromCodePoint;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, null, ...args);
$(result);
const ctx2 = { ignore: true };
const args2 = [128544, 128545];
const tmpMCOO$1 = $String_fromCodePoint;
const tmpMCF$1 = tmpMCOO$1.call;
const result2 = $dotCall(tmpMCF$1, tmpMCOO$1, `call`, ctx2, ...args2);
$(result2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '☃★☆'
 - 2: '😠😡'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
