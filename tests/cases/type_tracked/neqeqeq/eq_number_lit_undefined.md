# Preval test case

# eq_number_lit_undefined.md

> Type tracked > Neqeqeq > Eq number lit undefined
>
> If we know the type of a value without knowing the actual value, we can still resolve `===`

## Input

`````js filename=intro
const x = 1 * $(2); // Must be number
$(x !== undefined); // Must be false
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(2);
tmpBinBothRhs ** 0;
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2) ** 0;
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
a ** 0;
$( true );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
