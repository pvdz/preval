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
const tmpFree /*:(string)=>string*/ = function $free($$0) {
  const xs$1 /*:string*/ = $$0;
  debugger;
  const one /*:string*/ = xs$1 + 5;
  const two /*:string*/ = $dotCall($string_slice, one, `slice`, 1);
  const tmpRet /*:string*/ = $dotCall($string_repeat, two, `repeat`, 2);
  return tmpRet;
};
const x /*:unknown*/ = $(`x`);
const xs /*:string*/ = $coerce(x, `plustr`);
const y /*:unknown*/ = $(`y`);
$coerce(y, `plustr`);
const t /*:string*/ = $frfr(tmpFree, xs);
$(t);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(xs$1) {
  const tmpRet = $dotCall($string_repeat, $dotCall($string_slice, xs$1 + 5, `slice`, 1), `repeat`, 2);
  return tmpRet;
};
const xs = $(`x`) + ``;
$(`y`) + ``;
$(tmpFree(xs));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $free($$0 ) {
  const b = $$0;
  debugger;
  const c = b + 5;
  const d = $dotCall( $string_slice, c, "slice", 1 );
  const e = $dotCall( $string_repeat, d, "repeat", 2 );
  return e;
};
const f = $( "x" );
const g = $coerce( f, "plustr" );
const h = $( "y" );
$coerce( h, "plustr" );
const i = j( a, g );
$( i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function $free($$0) {
  let a = $$0;
  debugger;
  const one = a + 5;
  const tmpMCF = one.slice;
  const two = $dotCall(tmpMCF, one, `slice`, 1);
  return two;
};
const x = $(`x`);
const xs = $coerce(x, `plustr`);
const y = $(`y`);
const ys = $coerce(y, `plustr`);
const r = $frfr(f, xs, ys);
const tmpMCF$1 = r.repeat;
const t = $dotCall(tmpMCF$1, r, `repeat`, 2);
$(t);
`````


## Todos triggered


- (todo) frfr and free arg mismatch
- (todo) type trackeed tricks can possibly support static $string_repeat


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
