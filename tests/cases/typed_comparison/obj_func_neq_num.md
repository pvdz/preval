# Preval test case

# obj_func_neq_num.md

> Typed comparison > Obj func neq num
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

## Input

`````js filename=intro
const x = function(){};
const y = x !== false;
$('out:', y);
`````

## Settled


`````js filename=intro
$(`out:`, true);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`out:`, true);
`````

## Pre Normal


`````js filename=intro
const x = function () {
  debugger;
};
const y = x !== false;
$(`out:`, y);
`````

## Normalized


`````js filename=intro
const x = function () {
  debugger;
  return undefined;
};
const y = x !== false;
$(`out:`, y);
`````

## PST Settled
With rename=true

`````js filename=intro
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
