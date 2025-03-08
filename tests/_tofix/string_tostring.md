# Preval test case

# string_tostring.md

> Tofix > string tostring
>
> A function returning the call to another function

existing test

you mean to tell me we dont know what string.tostring() is?

## Input

`````js filename=intro
const g = function(b) {
  const y = b.toString();
  return y;
};
const f = function(a) {
  const x = g(a);
  return x;
};
const r = f(String);
$(r);
`````

## Settled


`````js filename=intro
const r /*:string*/ = String.toString();
$(r);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(String.toString());
`````

## Pre Normal


`````js filename=intro
const g = function ($$0) {
  let b = $$0;
  debugger;
  const y = b.toString();
  return y;
};
const f = function ($$0) {
  let a = $$0;
  debugger;
  const x = g(a);
  return x;
};
const r = f(String);
$(r);
`````

## Normalized


`````js filename=intro
const g = function ($$0) {
  let b = $$0;
  debugger;
  const y = b.toString();
  return y;
};
const f = function ($$0) {
  let a = $$0;
  debugger;
  const x = g(a);
  return x;
};
const r = f(String);
$(r);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = String.toString();
$( a );
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
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $function_toString