# Preval test case

# assign_lhs.md

> Expr order > Assign lhs
>
> The order of occurrence is relevant.

Must take into account that the simple node i will still change value if we move the complex node to appear before it.

## Input

`````js filename=intro
let i = 0;
let j = ++i + i;
$(j);
`````

## Settled


`````js filename=intro
$(2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````

## Pre Normal


`````js filename=intro
let i = 0;
let j = ++i + i;
$(j);
`````

## Normalized


`````js filename=intro
let i = 0;
const tmpPostUpdArgIdent = $coerce(i, `number`);
i = tmpPostUpdArgIdent + 1;
const tmpBinLhs = i;
let j = tmpBinLhs + i;
$(j);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
