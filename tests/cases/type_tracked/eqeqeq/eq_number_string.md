# Preval test case

# eq_number_string.md

> Type tracked > Eqeqeq > Eq number string
>
> If we know the type of a value without knowing the actual value, we can still resolve `===`

## Input

`````js filename=intro
const x = 1 * $(2); // Must be number
const y = '' + $(2); // Must be string
$(x === y); // Must be false (number !== bool)
`````

## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(2);
tmpBinBothRhs ** 0;
const tmpBinBothRhs$1 /*:unknown*/ = $(2);
$coerce(tmpBinBothRhs$1, `plustr`);
$(false);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2) ** 0;
$coerce($(2), `plustr`);
$(false);
`````

## Pre Normal


`````js filename=intro
const x = 1 * $(2);
const y = `` + $(2);
$(x === y);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(2);
const x = tmpBinBothLhs * tmpBinBothRhs;
const tmpBinBothLhs$1 = ``;
const tmpBinBothRhs$1 = $(2);
const y = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpCalleeParam = x === y;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
a ** 0;
const b = $( 2 );
$coerce( b, "plustr" );
$( false );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
