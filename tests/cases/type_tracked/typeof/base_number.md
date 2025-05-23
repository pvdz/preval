# Preval test case

# base_number.md

> Type tracked > Typeof > Base number
>
> If we know the type of a value without knowing the actual value, we can still resolve `typeof`

## Input

`````js filename=intro
const x = 1 * $(2);
$(typeof x);
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(2);
tmpBinBothRhs ** 0;
$(`number`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2) ** 0;
$(`number`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
a ** 0;
$( "number" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(2);
const x = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = typeof x;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
