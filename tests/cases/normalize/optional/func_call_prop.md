# Preval test case

# func_call_prop.md

> Normalize > Optional > Func call prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  return $(parseInt(15)?.foo);
}
$(f());
`````

## Settled


`````js filename=intro
const tmpChainElementObject /*:unknown*/ = (15).foo;
const tmpReturnArg /*:unknown*/ = $(tmpChainElementObject);
$(tmpReturnArg);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($((15).foo));
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return $(parseInt(15)?.foo);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let tmpCalleeParam = undefined;
  const tmpChainRootCall = parseInt;
  const tmpChainElementCall = 15;
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainElementCall.foo;
    tmpCalleeParam = tmpChainElementObject;
  } else {
  }
  const tmpReturnArg = $(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 15.foo;
const b = $( a );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
