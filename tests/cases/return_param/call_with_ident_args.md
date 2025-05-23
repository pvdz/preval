# Preval test case

# call_with_ident_args.md

> Return param > Call with ident args
>
> If a function returns a static mutation to a param value we can outline the param and drop it

The implicit arg should block the trick.

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  const foo = $('please');
  
  const y = x(1, 'two', foo, NaN);
  return y;
}

$(f(function(a,b,c,d,e){ $('pass1', a,b,c,d,e); }));
$(f(function(a,b,c,d,e){ $('pass2', a,b,c,d,e); }));
$(f(function(a,b,c,d,e){ $('pass3', a,b,c,d,e); }));
`````


## Settled


`````js filename=intro
const f /*:(function)=>unknown*/ = function ($$0) {
  const x /*:function*/ = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  const foo /*:unknown*/ = $(`please`);
  const y /*:unknown*/ = x(1, `two`, foo, $Number_NaN);
  return y;
};
const tmpCalleeParam$1 /*:(unknown, unknown, unknown, unknown, unknown)=>undefined*/ = function ($$0, $$1, $$2, $$3, $$4) {
  const a /*:unknown*/ = $$0;
  const b /*:unknown*/ = $$1;
  const c /*:unknown*/ = $$2;
  const d /*:unknown*/ = $$3;
  const e /*:unknown*/ = $$4;
  debugger;
  $(`pass1`, a, b, c, d, e);
  return undefined;
};
const tmpCalleeParam /*:unknown*/ = f(tmpCalleeParam$1);
$(tmpCalleeParam);
const tmpCalleeParam$5 /*:(unknown, unknown, unknown, unknown, unknown)=>undefined*/ = function ($$0, $$1, $$2, $$3, $$4) {
  const a$1 /*:unknown*/ = $$0;
  const b$1 /*:unknown*/ = $$1;
  const c$1 /*:unknown*/ = $$2;
  const d$1 /*:unknown*/ = $$3;
  const e$1 /*:unknown*/ = $$4;
  debugger;
  $(`pass2`, a$1, b$1, c$1, d$1, e$1);
  return undefined;
};
const tmpCalleeParam$3 /*:unknown*/ = f(tmpCalleeParam$5);
$(tmpCalleeParam$3);
const tmpCalleeParam$9 /*:(unknown, unknown, unknown, unknown, unknown)=>undefined*/ = function ($$0, $$1, $$2, $$3, $$4) {
  const a$3 /*:unknown*/ = $$0;
  const b$3 /*:unknown*/ = $$1;
  const c$3 /*:unknown*/ = $$2;
  const d$3 /*:unknown*/ = $$3;
  const e$3 /*:unknown*/ = $$4;
  debugger;
  $(`pass3`, a$3, b$3, c$3, d$3, e$3);
  return undefined;
};
const tmpCalleeParam$7 /*:unknown*/ = f(tmpCalleeParam$9);
$(tmpCalleeParam$7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (x) {
  $(`no`);
  $(`inlining`);
  const y = x(1, `two`, $(`please`), $Number_NaN);
  return y;
};
$(
  f(function (a, b, c, d, e) {
    $(`pass1`, a, b, c, d, e);
  }),
);
$(
  f(function (a$1, b$1, c$1, d$1, e$1) {
    $(`pass2`, a$1, b$1, c$1, d$1, e$1);
  }),
);
$(
  f(function (a$3, b$3, c$3, d$3, e$3) {
    $(`pass3`, a$3, b$3, c$3, d$3, e$3);
  }),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $( "no" );
  $( "inlining" );
  const c = $( "please" );
  const d = b( 1, "two", c, $Number_NaN );
  return d;
};
const e = function($$0,$$1,$$2,$$3,$$4 ) {
  const f = $$0;
  const g = $$1;
  const h = $$2;
  const i = $$3;
  const j = $$4;
  debugger;
  $( "pass1", f, g, h, i, j );
  return undefined;
};
const k = a( e );
$( k );
const l = function($$0,$$1,$$2,$$3,$$4 ) {
  const m = $$0;
  const n = $$1;
  const o = $$2;
  const p = $$3;
  const q = $$4;
  debugger;
  $( "pass2", m, n, o, p, q );
  return undefined;
};
const r = a( l );
$( r );
const s = function($$0,$$1,$$2,$$3,$$4 ) {
  const t = $$0;
  const u = $$1;
  const v = $$2;
  const w = $$3;
  const x = $$4;
  debugger;
  $( "pass3", t, u, v, w, x );
  return undefined;
};
const y = a( s );
$( y );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  const foo = $(`please`);
  const y = x(1, `two`, foo, $Number_NaN);
  return y;
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = function ($$0, $$1, $$2, $$3, $$4) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  let e = $$4;
  debugger;
  $(`pass1`, a, b, c, d, e);
  return undefined;
};
let tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
const tmpCallCallee$1 = f;
let tmpCalleeParam$5 = function ($$0, $$1, $$2, $$3, $$4) {
  let a$1 = $$0;
  let b$1 = $$1;
  let c$1 = $$2;
  let d$1 = $$3;
  let e$1 = $$4;
  debugger;
  $(`pass2`, a$1, b$1, c$1, d$1, e$1);
  return undefined;
};
let tmpCalleeParam$3 = f(tmpCalleeParam$5);
$(tmpCalleeParam$3);
const tmpCallCallee$3 = f;
let tmpCalleeParam$9 = function ($$0, $$1, $$2, $$3, $$4) {
  let a$3 = $$0;
  let b$3 = $$1;
  let c$3 = $$2;
  let d$3 = $$3;
  let e$3 = $$4;
  debugger;
  $(`pass3`, a$3, b$3, c$3, d$3, e$3);
  return undefined;
};
let tmpCalleeParam$7 = f(tmpCalleeParam$9);
$(tmpCalleeParam$7);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - 4: 'pass1', 1, 'two', 'please', NaN, undefined
 - 5: undefined
 - 6: 'no'
 - 7: 'inlining'
 - 8: 'please'
 - 9: 'pass2', 1, 'two', 'please', NaN, undefined
 - 10: undefined
 - 11: 'no'
 - 12: 'inlining'
 - 13: 'please'
 - 14: 'pass3', 1, 'two', 'please', NaN, undefined
 - 15: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
