# Preval test case

# call_with_implicit_args.md

> Return param > Call with implicit args
>
> If a function returns a static mutation to a param value we can outline the param and drop it

The implicit arg should block the trick.

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = x(1, 'two', foo, NaN);
  return y;
}

$(f(function(a,b,c,d,e){ $('pass1', a,b,c,d,e); }));
$(f(function(a,b,c,d,e){ $('pass2', a,b,c,d,e); }));
$(f(function(a,b,c,d,e){ $('pass3', a,b,c,d,e); }));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = x(1, `two`, foo, NaN);
  return y;
};
$(
  f(function ($$0, $$1, $$2, $$3, $$4) {
    let a = $$0;
    let b = $$1;
    let c = $$2;
    let d = $$3;
    let e = $$4;
    debugger;
    $(`pass1`, a, b, c, d, e);
  }),
);
$(
  f(function ($$0, $$1, $$2, $$3, $$4) {
    let a$1 = $$0;
    let b$1 = $$1;
    let c$1 = $$2;
    let d$1 = $$3;
    let e$1 = $$4;
    debugger;
    $(`pass2`, a$1, b$1, c$1, d$1, e$1);
  }),
);
$(
  f(function ($$0, $$1, $$2, $$3, $$4) {
    let a$3 = $$0;
    let b$3 = $$1;
    let c$3 = $$2;
    let d$3 = $$3;
    let e$3 = $$4;
    debugger;
    $(`pass3`, a$3, b$3, c$3, d$3, e$3);
  }),
);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = x(1, `two`, foo, NaN);
  return y;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = function ($$0, $$1, $$2, $$3, $$4) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  let e = $$4;
  debugger;
  $(`pass1`, a, b, c, d, e);
  return undefined;
};
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$3 = $;
const tmpCallCallee$5 = f;
const tmpCalleeParam$5 = function ($$0, $$1, $$2, $$3, $$4) {
  let a$1 = $$0;
  let b$1 = $$1;
  let c$1 = $$2;
  let d$1 = $$3;
  let e$1 = $$4;
  debugger;
  $(`pass2`, a$1, b$1, c$1, d$1, e$1);
  return undefined;
};
const tmpCalleeParam$3 = tmpCallCallee$5(tmpCalleeParam$5);
tmpCallCallee$3(tmpCalleeParam$3);
const tmpCallCallee$7 = $;
const tmpCallCallee$9 = f;
const tmpCalleeParam$9 = function ($$0, $$1, $$2, $$3, $$4) {
  let a$3 = $$0;
  let b$3 = $$1;
  let c$3 = $$2;
  let d$3 = $$3;
  let e$3 = $$4;
  debugger;
  $(`pass3`, a$3, b$3, c$3, d$3, e$3);
  return undefined;
};
const tmpCalleeParam$7 = tmpCallCallee$9(tmpCalleeParam$9);
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output


`````js filename=intro
const f /*:(function)=>?*/ = function ($$0) {
  const x /*:function*/ = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = x(1, `two`, foo, NaN);
  return y;
};
const tmpCalleeParam$1 /*:(unknown, unknown, unknown, unknown, unknown)=>undefined*/ = function ($$0, $$1, $$2, $$3, $$4) {
  const a = $$0;
  const b = $$1;
  const c = $$2;
  const d = $$3;
  const e = $$4;
  debugger;
  $(`pass1`, a, b, c, d, e);
  return undefined;
};
const tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
const tmpCalleeParam$5 /*:(unknown, unknown, unknown, unknown, unknown)=>undefined*/ = function ($$0, $$1, $$2, $$3, $$4) {
  const a$1 = $$0;
  const b$1 = $$1;
  const c$1 = $$2;
  const d$1 = $$3;
  const e$1 = $$4;
  debugger;
  $(`pass2`, a$1, b$1, c$1, d$1, e$1);
  return undefined;
};
const tmpCalleeParam$3 = f(tmpCalleeParam$5);
$(tmpCalleeParam$3);
const tmpCalleeParam$9 /*:(unknown, unknown, unknown, unknown, unknown)=>undefined*/ = function ($$0, $$1, $$2, $$3, $$4) {
  const a$3 = $$0;
  const b$3 = $$1;
  const c$3 = $$2;
  const d$3 = $$3;
  const e$3 = $$4;
  debugger;
  $(`pass3`, a$3, b$3, c$3, d$3, e$3);
  return undefined;
};
const tmpCalleeParam$7 = f(tmpCalleeParam$9);
$(tmpCalleeParam$7);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  $( "no" );
  $( "inlining" );
  $( "please" );
  const d = b( 1, "two", foo, NaN );
  return d;
};
const e = function($$0,$$1,$$2,$$3,$$4 ) {
  const f = c;
  const g = h;
  const i = j;
  const k = l;
  const m = n;
  debugger;
  $( "pass1", f, g, i, k, m );
  return undefined;
};
const o = a( e );
$( o );
const p = function($$0,$$1,$$2,$$3,$$4 ) {
  const q = c;
  const r = h;
  const s = j;
  const t = l;
  const u = n;
  debugger;
  $( "pass2", q, r, s, t, u );
  return undefined;
};
const v = a( p );
$( v );
const w = function($$0,$$1,$$2,$$3,$$4 ) {
  const x = c;
  const y = h;
  const z = j;
  const ba = l;
  const bb = n;
  debugger;
  $( "pass3", x, y, z, ba, bb );
  return undefined;
};
const bc = a( w );
$( bc );
`````

## Globals

BAD@! Found 1 implicit global bindings:

foo

## Result

Should call `$` with:
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
