# Preval test case

# tramp_return_call_computed_member_indirect.md

> Function inlining > Tramp return call computed member indirect
>
> A function returning the call to another function

## Input

`````js filename=intro
const toString = $('toString');
const g = function(o, p) {
  const y = o[p]();
  return y;
};
const f = function(m, n) {
  const x = g(m, n);
  return x;
};
const r = f(String, toString);
$(r);
`````

## Settled


`````js filename=intro
const toString /*:unknown*/ = $(`toString`);
const r /*:unknown*/ = String[toString]();
$(r);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const toString = $(`toString`);
$(String[toString]());
`````

## Pre Normal


`````js filename=intro
const toString = $(`toString`);
const g = function ($$0, $$1) {
  let o = $$0;
  let p = $$1;
  debugger;
  const y = o[p]();
  return y;
};
const f = function ($$0, $$1) {
  let m = $$0;
  let n = $$1;
  debugger;
  const x = g(m, n);
  return x;
};
const r = f(String, toString);
$(r);
`````

## Normalized


`````js filename=intro
const toString = $(`toString`);
const g = function ($$0, $$1) {
  let o = $$0;
  let p = $$1;
  debugger;
  const y = o[p]();
  return y;
};
const f = function ($$0, $$1) {
  let m = $$0;
  let n = $$1;
  debugger;
  const x = g(m, n);
  return x;
};
const r = f(String, toString);
$(r);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "toString" );
const b = String[ a ]();
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'toString'
 - 2: 'function() { [native code] }'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
