# Preval test case

# unsafe.md

> Normalize > This > Unsafe
>
> A constant set to null should be eliminated

Note: in strict mode this in global is gonna be bad.

## Input

`````js filename=intro
function f() {
  const x = this;
  function g() {
     return x; // Should not be inlined
  }
  return g();
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
  const tmpPrevalAliasThis = this;
  debugger;
  let g = function () {
    debugger;
    return x;
  };
  const x = tmpPrevalAliasThis;
  return g();
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  let g = function () {
    debugger;
    return x;
  };
  const x = tmpPrevalAliasThis;
  const tmpReturnArg = g();
  return tmpReturnArg;
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
