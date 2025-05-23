# Preval test case

# hex.md

> String escapes > Hex
>
> Welcome to the webcompat corner

## Input

`````js filename=intro
$("\x13\x17\x31\x08\x12\x29\x21\x22\x07\x16\x08\x07\x09");
`````


## Settled


`````js filename=intro
$(`\u0013\u00171\u0012)!"\u0007\u0016\u0007\u0009`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`\u0013\u00171\u0012)!"\u0007\u0016\u0007\u0009`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "\u0013\u00171\u0008\u0012)!\"\u0007\u0016\u0008\u0007\u0009" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`\u0013\u00171\u0012)!"\u0007\u0016\u0007\u0009`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '\u0013\u00171\b\u0012)!"\u0007\u0016\b\u0007\t'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
