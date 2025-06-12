# Preval test case

# string_fromCodePoint_direct_3args.md

> Builtins cases > Ai string > String fromCodePoint direct 3args
>
> Test String.fromCodePoint called directly with 3 arguments (three code points)

## Input

`````js filename=intro
const result = String.fromCodePoint(66, 67, 0x1F601);
$(result); // Expected: "BC\u{1F601}" (B, C, + grinning face with smiling eyes)
`````


## Settled


`````js filename=intro
$(`BC\ud83d\ude01`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`BC\ud83d\ude01`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "BC\ud83d\ude01" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $String_fromCodePoint;
const result = `BC\ud83d\ude01`;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'BC😁'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
