# Preval test case

# return_string_tostring.md

> Function > Return string tostring
>
> A function that returns Date.now()

The function is assumed to be pure (no observable side effects) but still not inlinable, although Date.now() is probably insufficient to stop this.

## Input

`````js filename=intro
function f() {
  return String.toString();
}
$(f());
`````

## Settled


`````js filename=intro
$(`function String() { [native code] }`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`function String() { [native code] }`);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return String.toString();
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpReturnArg = String.toString();
  return tmpReturnArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "function String() { [native code] }" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'function() { [native code] }'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- switch me to ref tracking