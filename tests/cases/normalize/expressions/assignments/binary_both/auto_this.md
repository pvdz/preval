# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Binary both > Auto this
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = this) + (a = this));
$(a);
`````

## Settled


`````js filename=intro
$(NaN);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(NaN);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = undefined) + (a = undefined));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
let tmpBinBothLhs = a;
a = undefined;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( NaN );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: NaN
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
