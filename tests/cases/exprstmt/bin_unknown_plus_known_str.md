# Preval test case

# bin_unknown_plus_known_str.md

> Exprstmt > Bin unknown plus known str
>
> Expression statements can be eliminated if we have enough information

## Input

`````js filename=intro
const x = "" * $;
x + $;
$(x);
`````


## Settled


`````js filename=intro
const x /*:number*/ = 0 * $;
$ + 0;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = 0 * $;
$ + 0;
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 0 * $;
$ + 0;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = 0 * $;
x + $;
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
