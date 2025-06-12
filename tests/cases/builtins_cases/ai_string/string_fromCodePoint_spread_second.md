# Preval test case

# string_fromCodePoint_spread_second.md

> Builtins cases > Ai string > String fromCodePoint spread second
>
> Test String.fromCodePoint called directly with spread as second argument (3 values)

## Input

`````js filename=intro
const arg1 = 9731;
const args = [9733, 9734, 9737];
const result = String.fromCodePoint(arg1, ...args);
$(result); // Expected: "\u2603\u2605\u2606\u2609"

// Test String.fromCodePoint called with spread arguments as second argument (should be treated as additional code points)
const arg2 = 0x1F617;
const extra = [0x1F619, 0x1F61A];
const result2 = String.fromCodePoint(arg2, ...extra);
$(result2); // Expected: "\u{1F617}\u{1F619}\u{1F61A}" (kissing + kissing smiling + kissing closed eyes)
`````


## Settled


`````js filename=intro
$(`\u2603\u2605\u2606\u2609`);
$(`\ud83d\ude17\ud83d\ude19\ud83d\ude1a`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`\u2603\u2605\u2606\u2609`);
$(`\ud83d\ude17\ud83d\ude19\ud83d\ude1a`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "\u2603\u2605\u2606\u2609" );
$( "\ud83d\ude17\ud83d\ude19\ud83d\ude1a" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arg1 = 9731;
const args = [9733, 9734, 9737];
const tmpMCF = $String_fromCodePoint;
const result = $String_fromCodePoint(arg1, ...args);
$(result);
const arg2 = 128535;
const extra = [128537, 128538];
const tmpMCF$1 = $String_fromCodePoint;
const result2 = $String_fromCodePoint(arg2, ...extra);
$(result2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '☃★☆☉'
 - 2: '😗😙😚'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
