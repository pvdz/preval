# Preval test case

# string_with_assignment_expression.md

> String fusing > Ai > String with assignment expression
>
> Test string concatenation with assignment expressions

## Input

`````js filename=intro
let counter = 0;
const result = "count: " + (counter += 1);
$(result);
`````


## Settled


`````js filename=intro
$(`count: 1`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`count: 1`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "count: 1" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let counter = 0;
const tmpBinBothLhs = `count: `;
counter = counter + 1;
const tmpBinBothRhs = counter;
const result = tmpBinBothLhs + tmpBinBothRhs;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'count: 1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
