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
const tmpMCF /*:unknown*/ = $string_constructor[toString];
const y /*:unknown*/ = $dotCall(tmpMCF, $string_constructor, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const toString = $(`toString`);
$($string_constructor[toString]());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "toString" );
const b = $string_constructor[ a ];
const c = $dotCall( b, $string_constructor, undefined );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const toString = $(`toString`);
const g = function ($$0, $$1) {
  let o = $$0;
  let p = $$1;
  debugger;
  const tmpMCF = o[p];
  const y = $dotCall(tmpMCF, o, undefined);
  return y;
};
const f = function ($$0, $$1) {
  let m = $$0;
  let n = $$1;
  debugger;
  const x = g(m, n);
  return x;
};
const r = f($string_constructor, toString);
$(r);
`````


## Todos triggered


None


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
