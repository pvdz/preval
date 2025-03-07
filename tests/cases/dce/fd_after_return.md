# Preval test case

# fd_after_return.md

> Dce > Fd after return
>
> Func decl after return that is used

The DCE should not eliminate the function or the code will break. This one is simple, eh.

## Input

`````js filename=intro
function f(x) {
  return g();
  function g() {
    return $()  
  }
}
$(f(1));
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $();
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($());
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  let g = function () {
    debugger;
    return $();
  };
  return g();
};
$(f(1));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  let g = function () {
    debugger;
    const tmpReturnArg = $();
    return tmpReturnArg;
  };
  const tmpReturnArg$1 = g();
  return tmpReturnArg$1;
};
const tmpCalleeParam = f(1);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $();
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
