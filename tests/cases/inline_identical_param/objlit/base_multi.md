# Preval test case

# base_multi.md

> Inline identical param > Objlit > Base multi
>
>

## Input

`````js filename=intro
function f(obj) {
  $(obj.a);
  $(obj.b);
  $(obj.c);
  $(obj.d);
}

f({a: 1, b: 2, c: 'hi', d: parseInt});
f({a: 3, b: 4, c: true, d: null});
`````

## Settled


`````js filename=intro
const f /*:(number, number, primitive, unknown)=>undefined*/ = function ($$0, $$1, $$2, $$3) {
  const d /*:unknown*/ = $$3;
  const c /*:primitive*/ = $$2;
  const b /*:number*/ = $$1;
  const a /*:number*/ = $$0;
  debugger;
  $(a);
  $(b);
  $(c);
  $(d);
  return undefined;
};
f(1, 2, `hi`, parseInt);
f(3, 4, true, null);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (a, b, c, d) {
  $(a);
  $(b);
  $(c);
  $(d);
};
f(1, 2, `hi`, parseInt);
f(3, 4, true, null);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let obj = $$0;
  debugger;
  $(obj.a);
  $(obj.b);
  $(obj.c);
  $(obj.d);
};
f({ a: 1, b: 2, c: `hi`, d: parseInt });
f({ a: 3, b: 4, c: true, d: null });
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let obj = $$0;
  debugger;
  const tmpCalleeParam = obj.a;
  $(tmpCalleeParam);
  const tmpCalleeParam$1 = obj.b;
  $(tmpCalleeParam$1);
  const tmpCalleeParam$3 = obj.c;
  $(tmpCalleeParam$3);
  const tmpCalleeParam$5 = obj.d;
  $(tmpCalleeParam$5);
  return undefined;
};
const tmpCallCallee = f;
const tmpCalleeParam$7 = { a: 1, b: 2, c: `hi`, d: parseInt };
tmpCallCallee(tmpCalleeParam$7);
const tmpCallCallee$1 = f;
const tmpCalleeParam$9 = { a: 3, b: 4, c: true, d: null };
tmpCallCallee$1(tmpCalleeParam$9);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2,$$3 ) {
  const b = $$3;
  const c = $$2;
  const d = $$1;
  const e = $$0;
  debugger;
  $( e );
  $( d );
  $( c );
  $( b );
  return undefined;
};
a( 1, 2, "hi", parseInt );
a( 3, 4, true, null );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'hi'
 - 4: '<function>'
 - 5: 3
 - 6: 4
 - 7: true
 - 8: null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
