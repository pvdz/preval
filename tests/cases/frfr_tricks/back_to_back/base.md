# Preval test case

# base.md

> Frfr tricks > Back to back > Base
>
> back to back $frfr calls

## Input

`````js filename=intro
const f = function $free(a, b) {
  const one = parseInt(a + 5, b);
  const two = one.slice(1);
  return two;
}
const g = function $free(a, b) {
  const one = parseInt(a + 500, b);
  const two = a.slice(2);
  return two;
}

const x = $spy('x');
const xs = x + '';
const y = $spy('y');
const ys = y + '';
const r = $frfr(f, xs, ys);
const s = $frfr(g, r, ys);
const rs = r + s;
$(rs);
`````


## Settled


`````js filename=intro
const tmpFree /*:(string, string)=>primitive*/ = function $free($$0, $$1) {
  const xs$1 /*:string*/ = $$0;
  const ys$1 /*:string*/ = $$1;
  debugger;
  const tmpCalleeParam /*:string*/ = xs$1 + 5;
  const one /*:number*/ = parseInt(tmpCalleeParam, ys$1);
  const tmpCallCompVal /*:unknown*/ = one.slice;
  const two /*:unknown*/ = $dotCall(tmpCallCompVal, one, `slice`, 1);
  two + 0;
  const tmpCallCompVal$1 /*:unknown*/ = two.slice;
  const two$1 /*:unknown*/ = $dotCall(tmpCallCompVal$1, two, `slice`, 2);
  const tmpRet /*:primitive*/ = two + two$1;
  return tmpRet;
};
const x /*:unknown*/ = $spy(`x`);
const xs /*:string*/ = $coerce(x, `plustr`);
const y /*:unknown*/ = $spy(`y`);
const ys /*:string*/ = $coerce(y, `plustr`);
const rs /*:primitive*/ = $frfr(tmpFree, xs, ys);
$(rs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(xs$1, ys$1) {
  const one = parseInt(xs$1 + 5, ys$1);
  const two = one.slice(1);
  two + 0;
  const tmpRet = two + two.slice(2);
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
  const f = parseInt( e, d );
  const g = f.slice;
  const h = $dotCall( g, f, "slice", 1 );
  h + 0;
  const i = h.slice;
  const j = $dotCall( i, h, "slice", 2 );
  const k = h + j;
  return k;
};
const l = $spy( "x" );
const m = $coerce( l, "plustr" );
const n = $spy( "y" );
const o = $coerce( n, "plustr" );
const p = q( a, m, o );
$( p );
`````


## Todos triggered


None


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
