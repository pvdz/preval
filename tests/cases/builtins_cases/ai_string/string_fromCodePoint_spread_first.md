# Preval test case

# string_fromCodePoint_spread_first.md

> Builtins cases > Ai string > String fromCodePoint spread first
>
> Test String.fromCodePoint called directly with spread as first argument (3 values)

## Input

`````js filename=intro
const args = [9731, 9733, 9734];
const result = String.fromCodePoint(...args);
$(result); // Expected: "\u2603\u2605\u2606"

// Test String.fromCodePoint called with spread arguments (array with 1 element)
const args2 = [0x1F618];
const result2 = String.fromCodePoint(...args2);
$(result2); // Expected: "\u{1F618}" (face blowing a kiss)
`````


## Settled


`````js filename=intro
$(`\u2603\u2605\u2606`);
$(`\ud83d\ude18`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`\u2603\u2605\u2606`);
$(`\ud83d\ude18`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "\u2603\u2605\u2606" );
$( "\ud83d\ude18" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const args = [9731, 9733, 9734];
const tmpMCF = $String_fromCodePoint;
const result = $String_fromCodePoint(...args);
$(result);
const args2 = [128536];
const tmpMCF$1 = $String_fromCodePoint;
const result2 = $String_fromCodePoint(...args2);
$(result2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '☃★☆'
 - 2: '😘'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
