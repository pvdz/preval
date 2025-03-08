# Preval test case

# minus_minus_builtin.md

> Constants > Minus minus builtin
>
> Double negative is positive. These should be statically resolved for builtins.

## Input

`````js filename=intro
const x = -(-(Infinity));
const y = x;
$(y); // Should be inlined to -5
`````

## Settled


`````js filename=intro
$(Infinity);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(Infinity);
`````

## Pre Normal


`````js filename=intro
const x = -(-Infinity);
const y = x;
$(y);
`````

## Normalized


`````js filename=intro
const x = Infinity;
const y = x;
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( Infinity );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
