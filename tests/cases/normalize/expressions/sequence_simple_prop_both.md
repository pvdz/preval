# Preval test case

# sequence_simple_prop_both.md

> Normalize > Expressions > Sequence simple prop both
>
> An assignment with rhs of a property on a sequence that ends with a simple node

Relevant for intermediate artifacts.

## Input

`````js filename=intro
let a = 0;
a = 'Identifier'.length === 'woop'.length;
$(a);
`````

## Settled


`````js filename=intro
$(false);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
`````

## Pre Normal


`````js filename=intro
let a = 0;
a = `Identifier`.length === `woop`.length;
$(a);
`````

## Normalized


`````js filename=intro
let a = 0;
const tmpBinBothLhs = 10;
const tmpBinBothRhs = 4;
a = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( false );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
