# Preval test case

# obj_date_neq_num.md

> Typed comparison > Obj date neq num
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = new Date();
const y = x !== false;
$('out:', y);
`````

## Settled


`````js filename=intro
new Date();
$(`out:`, true);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
new Date();
$(`out:`, true);
`````

## Pre Normal


`````js filename=intro
const x = new Date();
const y = x !== false;
$(`out:`, y);
`````

## Normalized


`````js filename=intro
const x = new Date();
const y = x !== false;
$(`out:`, y);
`````

## PST Settled
With rename=true

`````js filename=intro
new Date();
$( "out:", true );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'out:', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
