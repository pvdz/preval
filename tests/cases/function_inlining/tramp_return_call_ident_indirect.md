# Preval test case

# tramp_return_call_ident_indirect.md

> Function inlining > Tramp return call ident indirect
>
> A function returning the call to another function

## Input

`````js filename=intro
const g = function(a) {
  const y = a(10);
  return y;
};
const f = function(b) {
  const x = g(b);
  return x;
};
const r = f($);
$(r);
`````


## Settled


`````js filename=intro
const y /*:unknown*/ = $(10);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(10));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const g = function ($$0) {
  let a = $$0;
  debugger;
  const y = a(10);
  return y;
};
const f = function ($$0) {
  let b = $$0;
  debugger;
  const x = g(b);
  return x;
};
const r = f($);
$(r);
`````


## Todos triggered


- (todo) support Identifier as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
