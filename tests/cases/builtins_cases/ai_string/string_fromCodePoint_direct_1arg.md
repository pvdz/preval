# Preval test case

# string_fromCodePoint_direct_1arg.md

> Builtins cases > Ai string > String fromCodePoint direct 1arg
>
> Test String.fromCodePoint called directly with 1 argument (single code point)

## Input

`````js filename=intro
const result = String.fromCodePoint(9731);
$(result); // Expected: "\u2603" (snowman)
`````


## Settled


`````js filename=intro
$(`\u2603`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`\u2603`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "\u2603" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $String_fromCodePoint;
const result = `\u2603`;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '☃'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
