# Preval test case

# string_fromCodePoint_spread_second_4args.md

> Builtins cases > Ai string > String fromCodePoint spread second 4args
>
> Test String.fromCodePoint called with spread arguments as second argument (4 elements, all used as code points)

## Input

`````js filename=intro
const arg1 = 0x1F61B;
const extra = [0x1F61C, 0x1F61D, 0x1F61E, 0x1F61F];
const result = String.fromCodePoint(arg1, ...extra);
$(result); // Expected: "\u{1F61B}\u{1F61C}\u{1F61D}\u{1F61E}\u{1F61F}" (tongue + winking tongue + squinting tongue + disappointed + worried)
`````


## Settled


`````js filename=intro
$(`\ud83d\ude1b\ud83d\ude1c\ud83d\ude1d\ud83d\ude1e\ud83d\ude1f`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`\ud83d\ude1b\ud83d\ude1c\ud83d\ude1d\ud83d\ude1e\ud83d\ude1f`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "\ud83d\ude1b\ud83d\ude1c\ud83d\ude1d\ud83d\ude1e\ud83d\ude1f" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arg1 = 128539;
const extra = [128540, 128541, 128542, 128543];
const tmpMCF = $String_fromCodePoint;
const result = $String_fromCodePoint(arg1, ...extra);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '😛😜😝😞😟'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
