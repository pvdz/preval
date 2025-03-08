# Preval test case

# string.md

> Type tracked > Constructors > String
>
> The String() constructor on a value we know to be bool is a noop

## Input

`````js filename=intro
const x = "" + $(1);
$(String(x)); // Is the same as `x` and dropping the `String` call should not be observable
`````

## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(1);
const x /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($coerce($(1), `plustr`));
`````

## Pre Normal


`````js filename=intro
const x = `` + $(1);
$(String(x));
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $(1);
const x = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringFirstArg = x;
const tmpCalleeParam = $coerce(x, `string`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $coerce( a, "plustr" );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: '1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
