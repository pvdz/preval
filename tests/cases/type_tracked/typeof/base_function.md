# Preval test case

# base_function.md

> Type tracked > Typeof > Base function
>
> If we know the type of a value without knowing the actual value, we can still resolve `typeof`

## Input

`````js filename=intro
const x = function (){};
$(typeof x);
`````

## Settled


`````js filename=intro
$(`function`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`function`);
`````

## Pre Normal


`````js filename=intro
const x = function () {
  debugger;
};
$(typeof x);
`````

## Normalized


`````js filename=intro
const x = function () {
  debugger;
  return undefined;
};
const tmpCalleeParam = typeof x;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "function" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'function'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
