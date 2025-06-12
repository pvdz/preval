# Preval test case

# string_fromCodePoint_spread_first_4args.md

> Builtins cases > Ai string > String fromCodePoint spread first 4args
>
> Test String.fromCodePoint called with spread arguments (array with 4 elements)

## Input

`````js filename=intro
const args = [0x1F613, 0x1F614, 0x1F615, 0x1F616];
const result = String.fromCodePoint(...args);
$(result); // Expected: "\u{1F613}\u{1F614}\u{1F615}\u{1F616}" (sweat + pensive + confused + confounded)
`````


## Settled


`````js filename=intro
$(`\ud83d\ude13\ud83d\ude14\ud83d\ude15\ud83d\ude16`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`\ud83d\ude13\ud83d\ude14\ud83d\ude15\ud83d\ude16`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "\ud83d\ude13\ud83d\ude14\ud83d\ude15\ud83d\ude16" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const args = [128531, 128532, 128533, 128534];
const tmpMCF = $String_fromCodePoint;
const result = $String_fromCodePoint(...args);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '😓😔😕😖'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
