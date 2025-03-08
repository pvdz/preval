# Preval test case

# tramp_return_call_member.md

> Function inlining > Tramp return call member
>
> A function returning the call to another function

## Input

`````js filename=intro
const g = function() {
  const y = String.toString();
  return y;
};
const f = function() {
  const x = g();
  return x;
};
const r = f();
$(r);
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
const g = function () {
  debugger;
  const y = String.toString();
  return y;
};
const f = function () {
  debugger;
  const x = g();
  return x;
};
const r = f();
$(r);
`````

## Normalized


`````js filename=intro
const g = function () {
  debugger;
  const y = String.toString();
  return y;
};
const f = function () {
  debugger;
  const x = g();
  return x;
};
const r = f();
$(r);
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
