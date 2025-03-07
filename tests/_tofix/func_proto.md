# Preval test case

# func_proto.md

> Tofix > func proto
>
> The function has its own prototype object, not to be confused
> with func.__proto__ which would point to Function.prototype

## Input

`````js filename=intro
$(function(){}.prototype);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````

## Pre Normal


`````js filename=intro
$(
  function () {
    debugger;
  }.prototype,
);
`````

## Normalized


`````js filename=intro
const tmpCompObj = function () {
  debugger;
  return undefined;
};
const tmpCalleeParam = tmpCompObj.prototype;
$(tmpCalleeParam);
`````

## Settled


`````js filename=intro
$(undefined);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: BAD!!
 - 1: undefined
 - eval returned: undefined

Denormalized calls: BAD!!
 - 1: undefined
 - eval returned: undefined
