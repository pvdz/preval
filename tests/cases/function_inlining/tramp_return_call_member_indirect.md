# Preval test case

# tramp_return_call_member_indirect.md

> Function inlining > Tramp return call member indirect
>
> A function returning the call to another function

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
$(`function String() { [native code] }`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`function String() { [native code] }`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "function String() { [native code] }" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const g = function ($$0) {
  let b = $$0;
  debugger;
  const tmpMCF = b.toString;
  const y = $dotCall(tmpMCF, b, `toString`);
  return y;
};
const f = function ($$0) {
  let a = $$0;
  debugger;
  const x = g(a);
  return x;
};
const r = f($string_constructor);
$(r);
`````


## Todos triggered


None


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
