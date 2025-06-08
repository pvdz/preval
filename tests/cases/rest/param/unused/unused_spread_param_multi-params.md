# Preval test case

# unused_spread_param_multi-params.md

> Rest > Param > Unused > Unused spread param multi-params
>
> A function with a spread param that we know will not receive any args should be an empty array

## Input

`````js filename=intro
function f(a, b, ...rest) {
  $(a, b, rest);
}
f(1, 2);
f('a', 'b');
f($spy(), $spy());
`````


## Settled


`````js filename=intro
const f /*:(unknown, unknown)=>undefined*/ = function ($$0, $$1) {
  const a /*:unknown*/ = $$0;
  const b /*:unknown*/ = $$1;
  debugger;
  const rest /*:array*/ /*truthy*/ = [];
  $(a, b, rest);
  return undefined;
};
f(1, 2);
f(`a`, `b`);
const tmpCalleeParam /*:unknown*/ = $spy();
const tmpCalleeParam$1 /*:unknown*/ = $spy();
f(tmpCalleeParam, tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (a, b) {
  $(a, b, []);
};
f(1, 2);
f(`a`, `b`);
f($spy(), $spy());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = $$0;
  const c = $$1;
  debugger;
  const d = [];
  $( b, c, d );
  return undefined;
};
a( 1, 2 );
a( "a", "b" );
const e = $spy();
const f = $spy();
a( e, f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1, ...$$2 /*:array*/) {
  let a = $$0;
  let b = $$1;
  let rest = $$2;
  debugger;
  $(a, b, rest);
  return undefined;
};
f(1, 2);
f(`a`, `b`);
const tmpCallCallee = f;
let tmpCalleeParam = $spy();
let tmpCalleeParam$1 = $spy();
f(tmpCalleeParam, tmpCalleeParam$1);
`````


## Todos triggered


- (todo) drop unused rest param?
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 2, []
 - 2: 'a', 'b', []
 - 3: 'Creating spy', 1, 0, ['spy', 12345]
 - 4: 'Creating spy', 2, 0, ['spy', 12345]
 - 5: '<spy[1]>', '<spy[2]>', []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
