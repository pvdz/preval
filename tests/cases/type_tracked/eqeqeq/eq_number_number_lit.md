# Preval test case

# eq_number_number_lit.md

> Type tracked > Eqeqeq > Eq number number lit
>
> If we know the type of a value without knowing the actual value, we can still resolve `===`

## Input

`````js filename=intro
const x = 1 * $(2); // Must be number
$(2 === x); // Must be false (number !== bool)
`````

## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(2);
const x /*:number*/ = 1 * tmpBinBothRhs;
const tmpCalleeParam /*:boolean*/ = 2 === x;
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(2);
const x = 1 * tmpBinBothRhs;
$(2 === x);
`````

## Pre Normal


`````js filename=intro
const x = 1 * $(2);
$(2 === x);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(2);
const x = tmpBinBothLhs * tmpBinBothRhs;
const tmpCalleeParam = 2 === x;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = 1 * a;
const c = 2 === b;
$( c );
`````

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
