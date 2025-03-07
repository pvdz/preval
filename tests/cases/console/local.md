# Preval test case

# local.md

> Console > Local
>
>

## Input

`````js filename=intro
const console = {log: function(){ }};
console.log('yooo foo');
`````

## Settled


`````js filename=intro

`````

## Denormalized
(This ought to be the final result)

`````js filename=intro

`````

## Pre Normal


`````js filename=intro
const console$1 = {
  log: function () {
    debugger;
  },
};
console$1.log(`yooo foo`);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = function () {
  debugger;
  return undefined;
};
const console$1 = { log: tmpObjLitVal };
console$1.log(`yooo foo`);
`````

## PST Settled
With rename=true

`````js filename=intro

`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
