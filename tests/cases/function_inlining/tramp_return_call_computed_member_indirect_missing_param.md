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
const tmpMCF /*:unknown*/ = $string_constructor.undefined;
const y /*:unknown*/ = $dotCall(tmpMCF, $string_constructor, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`toString`);
$($string_constructor.undefined());
`````


## PST Settled
With rename=true

`````js filename=intro
$( "toString" );
const a = $string_constructor.undefined;
const b = $dotCall( a, $string_constructor, undefined );
$( b );
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
  const x = g(m);
  return x;
};
const r = f($string_constructor, toString);
$(r);
`````


## Todos triggered


- (todo) support Identifier as var init in let_hoisting noob check


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
