# Preval test case

# string_fromCodePoint_direct_2args.md

> Builtins cases > Ai string > String fromCodePoint direct 2args
>
> Test String.fromCodePoint called directly with 2 arguments (two code points)

## Input

`````js filename=intro
const result = String.fromCodePoint(65, 0x1F600);
$(result); // Expected: "A\u{1F600}" (A + grinning face)
`````


## Settled


`````js filename=intro
$(`A\ud83d\ude00`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`A\ud83d\ude00`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "A\ud83d\ude00" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $String_fromCodePoint;
const result = `A\ud83d\ude00`;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'A😀'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
