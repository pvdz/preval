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
const tmpMCF /*:unknown*/ = String.undefined;
const y /*:unknown*/ = $dotCall(tmpMCF, String, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`toString`);
$(String.undefined());
`````


## PST Settled
With rename=true

`````js filename=intro
$( "toString" );
const a = String.undefined;
const b = $dotCall( a, String, undefined );
$( b );
`````


## Todos triggered


None


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
