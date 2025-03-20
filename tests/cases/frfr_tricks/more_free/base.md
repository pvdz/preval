# Preval test case

# base.md

> Frfr tricks > More free > Base
>
> $frfr with a free statement following can suck it up

## Input

`````js filename=intro
const f = function $free(a) {
  const one = a + 5;
  const two = one.slice(1);
  return two;
}

const x = $('x');
const xs = x + '';
const y = $('y');
const ys = y + '';
const r = $frfr(f, xs, ys);
const t = r.repeat(2)
$(t);
`````


## Settled


`````js filename=intro
const tmpFree /*:(string, unused)=>string*/ = function $free($$0, $$1) {
  const xs$1 /*:string*/ = $$0;
  debugger;
  const one /*:string*/ = xs$1 + 5;
  const two /*:string*/ = one.slice(1);
  const tmpRet /*:string*/ = two.repeat(2);
  return tmpRet;
};
const x /*:unknown*/ = $(`x`);
const xs /*:string*/ = $coerce(x, `plustr`);
const y /*:unknown*/ = $(`y`);
const ys /*:string*/ = $coerce(y, `plustr`);
const t /*:string*/ = $frfr(tmpFree, xs, ys);
$(t);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(xs$1, $$1) {
  const tmpRet = (xs$1 + 5).slice(1).repeat(2);
  return tmpRet;
};
const xs = $coerce($(`x`), `plustr`);
$($frfr(tmpFree, xs, $coerce($(`y`), `plustr`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0,$$1 ) {
  const c = $$0;
  debugger;
  const d = c + 5;
  const e = d.slice( 1 );
  const f = e.repeat( 2 );
  return f;
};
const g = $( "x" );
const h = $coerce( g, "plustr" );
const i = $( "y" );
const j = $coerce( i, "plustr" );
const k = l( a, h, j );
$( k );
`````


## Todos triggered


- frfr and free arg mismatch
- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $string_repeat


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - 2: 'y'
 - 3: '55'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
