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

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  const foo = $(`please`);
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
  const foo = $(`please`);
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
const f = function ($$0) {
  const x /*:function*/ = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  const foo = $(`please`);
  const y = x(1, `two`, foo, NaN);
  return y;
};
const tmpCalleeParam$1 = function ($$0, $$1, $$2, $$3, $$4) {
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
const tmpCalleeParam$5 = function ($$0, $$1, $$2, $$3, $$4) {
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
const tmpCalleeParam$9 = function ($$0, $$1, $$2, $$3, $$4) {
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
  const d = $( "please" );
  const e = b( 1, "two", d, NaN );
  return e;
};
const f = function($$0,$$1,$$2,$$3,$$4 ) {
  const g = c;
  const h = i;
  const j = k;
  const l = m;
  const n = o;
  debugger;
  $( "pass1", g, h, j, l, n );
  return undefined;
};
const p = a( f );
$( p );
const q = function($$0,$$1,$$2,$$3,$$4 ) {
  const r = c;
  const s = i;
  const t = k;
  const u = m;
  const v = o;
  debugger;
  $( "pass2", r, s, t, u, v );
  return undefined;
};
const w = a( q );
$( w );
const x = function($$0,$$1,$$2,$$3,$$4 ) {
  const y = c;
  const z = i;
  const ba = k;
  const bb = m;
  const bc = o;
  debugger;
  $( "pass3", y, z, ba, bb, bc );
  return undefined;
};
const bd = a( x );
$( bd );
`````

## Globals

None

## Result

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

Final output calls: Same
