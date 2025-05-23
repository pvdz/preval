# Preval test case

# base.md

> Frfr tricks > Prim args > Base
>
> $frfr with primitive args should have those inlined

## Input

`````js filename=intro
const f = function $free(a, b, c) {
  const one = parseInt(a + 5, b);
  const two = one.slice(1, c);
  return two;
}
const x = $spy('x');
const xs = x + '';
const y = $spy('y');
const ys = y + '';
const r = $frfr(f, xs, 10, ys);
const rs = r + '';
$(rs);
`````


## Settled


`````js filename=intro
const tmpFree /*:(string, string)=>string*/ = function $free($$0, $$1) {
  const xs$1 /*:string*/ = $$0;
  const ys$1 /*:string*/ = $$1;
  debugger;
  const tmpCalleeParam /*:string*/ = xs$1 + 5;
  const one /*:number*/ = $Number_parseInt(tmpCalleeParam, 10);
  const tmpMCF /*:unknown*/ = one.slice;
  const r /*:unknown*/ = $dotCall(tmpMCF, one, `slice`, 1, ys$1);
  const tmpRet /*:string*/ = $coerce(r, `plustr`);
  return tmpRet;
};
const x /*:unknown*/ = $spy(`x`);
const xs /*:string*/ = $coerce(x, `plustr`);
const y /*:unknown*/ = $spy(`y`);
const ys /*:string*/ = $coerce(y, `plustr`);
const rs /*:string*/ = $frfr(tmpFree, xs, ys);
$(rs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(xs$1, ys$1) {
  const one = $Number_parseInt(xs$1 + 5, 10);
  const tmpRet = $coerce(one.slice(1, ys$1), `plustr`);
  return tmpRet;
};
const xs = $coerce($spy(`x`), `plustr`);
$($frfr(tmpFree, xs, $coerce($spy(`y`), `plustr`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0,$$1 ) {
  const c = $$0;
  const d = $$1;
  debugger;
  const e = c + 5;
  const f = $Number_parseInt( e, 10 );
  const g = f.slice;
  const h = $dotCall( g, f, "slice", 1, d );
  const i = $coerce( h, "plustr" );
  return i;
};
const j = $spy( "x" );
const k = $coerce( j, "plustr" );
const l = $spy( "y" );
const m = $coerce( l, "plustr" );
const n = o( a, k, m );
$( n );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function $free($$0, $$1, $$2) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  let tmpCalleeParam = a + 5;
  let tmpCalleeParam$1 = b;
  const one = $Number_parseInt(tmpCalleeParam, b);
  const tmpMCF = one.slice;
  const two = $dotCall(tmpMCF, one, `slice`, 1, c);
  return two;
};
const x = $spy(`x`);
const xs = $coerce(x, `plustr`);
const y = $spy(`y`);
const ys = $coerce(y, `plustr`);
const r = $frfr(f, xs, 10, ys);
const rs = $coerce(r, `plustr`);
$(rs);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Number_parseInt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['x', 'x']
 - 2: '$spy[1].valueOf()', 'x'
 - 3: 'Creating spy', 2, 1, ['y', 'y']
 - 4: '$spy[2].valueOf()', 'y'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
