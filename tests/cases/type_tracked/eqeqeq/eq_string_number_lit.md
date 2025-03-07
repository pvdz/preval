# Preval test case

# eq_string_number_lit.md

> Type tracked > Eqeqeq > Eq string number lit
>
> If we know the type of a value without knowing the actual value, we can still resolve `===`

## Input

`````js filename=intro
const x = 1 * $(2); // Must be number
$('' === x); // Must be false (number !== string)
`````

## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(2);
tmpBinBothRhs ** 0;
$(false);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2) ** 0;
$(false);
`````

## Pre Normal


`````js filename=intro
const x = 1 * $(2);
$(`` === x);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(2);
const x = tmpBinBothLhs * tmpBinBothRhs;
const tmpCalleeParam = `` === x;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
a ** 0;
$( false );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
