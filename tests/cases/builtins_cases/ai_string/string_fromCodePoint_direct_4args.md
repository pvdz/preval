# Preval test case

# string_fromCodePoint_direct_4args.md

> Builtins cases > Ai string > String fromCodePoint direct 4args
>
> Test String.fromCodePoint called directly with 4 arguments (four code points)

## Input

`````js filename=intro
const result = String.fromCodePoint(68, 69, 70, 0x1F602);
$(result); // Expected: "DEF\u{1F602}" (D, E, F, + face with tears of joy)
`````


## Settled


`````js filename=intro
$(`DEF\ud83d\ude02`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`DEF\ud83d\ude02`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "DEF\ud83d\ude02" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $String_fromCodePoint;
const result = `DEF\ud83d\ude02`;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'DEF😂'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
