# Preval test case

# no_arg.md

> Throw > No arg
>
> Returning a sequence that ends in a simple node

## Input

`````js filename=intro
function f(){ 
  throw 'x';
}
$(f());
`````

## Settled


`````js filename=intro
throw `x`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `x`;
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  throw `x`;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  throw `x`;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
throw "x";
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ x ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
