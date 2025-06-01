# Preval test case

# ai_rule342_func_rest_param_opaque_access.md

> Ai > Ai3 > Ai rule342 func rest param opaque access
>
> Test: Function with opaque rest parameter, elements accessed.

## Input

`````js filename=intro
// Expected: function f(...args) { $('a0', args[0]); $('a1', args[1]); } f($('p1'), $('p2'));
function foo(p1, p2, ...rest) {
  $('param1', p1);
  $('param2', p2);
  $('rest_itself', rest);
  $('rest_len', rest.length);
  $('rest_0', rest[0]);
  $('rest_1', rest[1]);
}
foo($('arg1'), $('arg2'), $('argRest1'), $('argRest2'));
`````


## Settled


`````js filename=intro
const foo /*:(unknown, unknown, array)=>undefined*/ = function ($$0, $$1, ...$$2 /*:array*/) {
  const p1 /*:unknown*/ = $$0;
  const p2 /*:unknown*/ = $$1;
  const rest /*:array*/ = $$2;
  debugger;
  $(`param1`, p1);
  $(`param2`, p2);
  $(`rest_itself`, rest);
  const tmpCalleeParam /*:number*/ = rest.length;
  $(`rest_len`, tmpCalleeParam);
  const tmpCalleeParam$1 /*:unknown*/ = rest[0];
  $(`rest_0`, tmpCalleeParam$1);
  const tmpCalleeParam$3 /*:unknown*/ = rest[1];
  $(`rest_1`, tmpCalleeParam$3);
  return undefined;
};
const tmpCalleeParam$5 /*:unknown*/ = $(`arg1`);
const tmpCalleeParam$7 /*:unknown*/ = $(`arg2`);
const tmpCalleeParam$9 /*:unknown*/ = $(`argRest1`);
const tmpCalleeParam$11 /*:unknown*/ = $(`argRest2`);
foo(tmpCalleeParam$5, tmpCalleeParam$7, tmpCalleeParam$9, tmpCalleeParam$11);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const foo = function (p1, p2, ...$$2 /*:array*/) {
  const rest = $$2;
  $(`param1`, p1);
  $(`param2`, p2);
  $(`rest_itself`, rest);
  $(`rest_len`, rest.length);
  $(`rest_0`, rest[0]);
  $(`rest_1`, rest[1]);
};
foo($(`arg1`), $(`arg2`), $(`argRest1`), $(`argRest2`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2 ) {
  const b = $$0;
  const c = $$1;
  const d = $$2;
  debugger;
  $( "param1", b );
  $( "param2", c );
  $( "rest_itself", d );
  const e = d.length;
  $( "rest_len", e );
  const f = d[ 0 ];
  $( "rest_0", f );
  const g = d[ 1 ];
  $( "rest_1", g );
  return undefined;
};
const h = $( "arg1" );
const i = $( "arg2" );
const j = $( "argRest1" );
const k = $( "argRest2" );
a( h, i, j, k );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let foo = function ($$0, $$1, ...$$2 /*:array*/) {
  let p1 = $$0;
  let p2 = $$1;
  let rest = $$2;
  debugger;
  $(`param1`, p1);
  $(`param2`, p2);
  $(`rest_itself`, rest);
  let tmpCalleeParam = rest.length;
  $(`rest_len`, tmpCalleeParam);
  let tmpCalleeParam$1 = rest[0];
  $(`rest_0`, tmpCalleeParam$1);
  let tmpCalleeParam$3 = rest[1];
  $(`rest_1`, tmpCalleeParam$3);
  return undefined;
};
const tmpCallCallee = foo;
let tmpCalleeParam$5 = $(`arg1`);
let tmpCalleeParam$7 = $(`arg2`);
let tmpCalleeParam$9 = $(`argRest1`);
let tmpCalleeParam$11 = $(`argRest2`);
foo(tmpCalleeParam$5, tmpCalleeParam$7, tmpCalleeParam$9, tmpCalleeParam$11);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'arg1'
 - 2: 'arg2'
 - 3: 'argRest1'
 - 4: 'argRest2'
 - 5: 'param1', 'arg1'
 - 6: 'param2', 'arg2'
 - 7: 'rest_itself', ['argRest1', 'argRest2']
 - 8: 'rest_len', 2
 - 9: 'rest_0', 'argRest1'
 - 10: 'rest_1', 'argRest2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
