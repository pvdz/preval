# Preval test case

# eq_number_lit_number.md

> Type tracked > Eqeqeq > Eq number lit number
>
> If we know the type of a value without knowing the actual value, we can still resolve `===`

## Input

`````js filename=intro
const x = 1 * $(2); // Must be number
$(x === 2); // Both are number so we can't predict the outcome
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(2);
const x /*:number*/ = 1 * tmpBinBothRhs;
const tmpCalleeParam /*:boolean*/ = x === 2;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(2);
$(1 * tmpBinBothRhs === 2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = 1 * a;
const c = b === 2;
$( c );
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
