# Preval test case

# tdz_wrong_side.md

> Tofix > tdz wrong side
>
> Where the read occurs after the if

The issue is that at the time of writing, the two implicit globals at the
end there ended up AFTER the var decl, rather than BEFORE it. So in that
case proxy_func() is called at least once, rather than never.

## Input

`````js filename=intro
const aliased = function($$0) {
  $('inner');
};
const arr = ['a', 'b', 'c', 'd', 'e'];
let sealer_alias = undefined;
let sealer_cache = undefined;
const proxy_func = function(str, payload) {
};
const a = proxy_func(22, bad_ref);
const b = proxy_func(12, oopsied);
$(a,b);
`````


## Settled


`````js filename=intro
$(undefined, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined, undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const aliased = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  $(`inner`);
  return undefined;
};
const arr = [`a`, `b`, `c`, `d`, `e`];
let sealer_alias = undefined;
let sealer_cache = undefined;
const proxy_func = function ($$0, $$1) {
  let str = $$0;
  let payload = $$1;
  debugger;
  return undefined;
};
const a = proxy_func(22, bad_ref);
const b = proxy_func(12, oopsied);
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: BAD!!
 - !1: undefined, undefined
 - !eval returned: undefined

Denormalized calls: BAD!!
 - !1: undefined, undefined
 - !eval returned: undefined
