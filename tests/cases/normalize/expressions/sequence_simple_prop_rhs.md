# Preval test case

# sequence_simple_prop_rhs.md

> Normalize > Expressions > Sequence simple prop rhs
>
> An assignment with rhs of a property on a sequence that ends with a simple node

Relevant for intermediate artifacts.

## Input

`````js filename=intro
let a = 0, b = 1, c = {x: {y: 10}};
a = 'Identifier' === ((b = c.x), b).y;
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
let a = 0,
  b = 1,
  c = { x: { y: 10 } };
a = `Identifier` === ((b = c.x), b).y;
$(a);
`````

## Normalized


`````js filename=intro
let a = 0;
let b = 1;
const tmpObjLitVal = { y: 10 };
let c = { x: tmpObjLitVal };
const tmpBinBothLhs = `Identifier`;
b = c.x;
const tmpCompObj = b;
const tmpBinBothRhs = tmpCompObj.y;
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
