# Preval test case

# create_func.md

> Function > Constructor > Create func
>
> Creating a function and calling it...

## Input

`````js filename=intro
const f = Function(`return 500`);
$(f());
`````

## Settled


`````js filename=intro
$(500);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(500);
`````

## Pre Normal


`````js filename=intro
const f = Function(`return 500`);
$(f());
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  return 500;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 500 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 500
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
