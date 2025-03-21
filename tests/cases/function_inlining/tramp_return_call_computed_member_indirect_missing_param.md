# Preval test case

# tramp_return_call_computed_member_indirect_missing_param.md

> Function inlining > Tramp return call computed member indirect missing param
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
  const x = g(m); // Missing param (!)
  return x;
};
const r = f(String, toString);
$(r);
`````

## Settled


`````js filename=intro
$(`toString`);
const r /*:unknown*/ = String[undefined]();
$(r);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`toString`);
$(String[undefined]());
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
  const x = g(m);
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
  const x = g(m);
  return x;
};
const r = f(String, toString);
$(r);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "toString" );
const a = String[ undefined ]();
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'toString'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
