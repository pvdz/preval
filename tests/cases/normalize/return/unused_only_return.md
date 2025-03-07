# Preval test case

# unused_only_return.md

> Normalize > Return > Unused only return
>
> Unused return statements should be eliminated

## Input

`````js filename=intro
function f() {
  return;
}

$(f());
`````

## Settled


`````js filename=intro
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
