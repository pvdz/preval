# Preval test case

# number.md

> Type tracked > Constructors > Number
>
> The Number() constructor on a value we know to be bool is a noop

## Input

`````js filename=intro
const x = $(5) * $("10");
$(Number(x)); // Is the same as `x` and dropping the `Number` call should not be observable
`````

## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(5);
const tmpBinBothRhs /*:unknown*/ = $(`10`);
const x /*:number*/ = tmpBinBothLhs * tmpBinBothRhs;
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(5);
$(tmpBinBothLhs * $(`10`));
`````

## Pre Normal


`````js filename=intro
const x = $(5) * $(`10`);
$(Number(x));
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = $(5);
const tmpBinBothRhs = $(`10`);
const x = tmpBinBothLhs * tmpBinBothRhs;
const tmpStringFirstArg = x;
const tmpCalleeParam = $coerce(x, `number`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 5 );
const b = $( "10" );
const c = a * b;
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 5
 - 2: '10'
 - 3: 50
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
