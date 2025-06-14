# Preval test case

# tramp_return_call_computed_member.md

> Function inlining > Tramp return call computed member
>
> A function returning the call to another function

## Input

`````js filename=intro
const toString = $('toString');
const g = function() {
  const y = String[toString]();
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
const toString /*:unknown*/ = $(`toString`);
const tmpMCF /*:unknown*/ = String[toString];
const y /*:unknown*/ = $dotCall(tmpMCF, $string_constructor, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const toString = $(`toString`);
$($dotCall(String[toString], $string_constructor, undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "toString" );
const b = String[ a ];
const c = $dotCall( b, $string_constructor, undefined );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const toString = $(`toString`);
const g = function () {
  debugger;
  const tmpMCF = String[toString];
  const y = $dotCall(tmpMCF, $string_constructor, undefined);
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
