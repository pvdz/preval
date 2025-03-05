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

## Pre Normal


`````js filename=intro
const f = function $free($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const one = parseInt(a + 5, b);
  const two = one.slice(1);
  return two;
};
const g = function $free($$0, $$1) {
  let a$1 = $$0;
  let b$1 = $$1;
  debugger;
  const one$1 = parseInt(a$1 + 500, b$1);
  const two$1 = a$1.slice(2);
  return two$1;
};
const x = $spy(`x`);
const xs = x + ``;
const y = $spy(`y`);
const ys = y + ``;
const r = $frfr(f, xs, ys);
const s = $frfr(g, r, ys);
const rs = r + s;
$(rs);
`````

## Normalized


`````js filename=intro
const f = function $free($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const tmpCalleeParam = a + 5;
  const tmpCalleeParam$1 = b;
  const one = parseInt(tmpCalleeParam, tmpCalleeParam$1);
  const two = one.slice(1);
  return two;
};
const g = function $free($$0, $$1) {
  let a$1 = $$0;
  let b$1 = $$1;
  debugger;
  const tmpCalleeParam$3 = a$1 + 500;
  const tmpCalleeParam$5 = b$1;
  const one$1 = parseInt(tmpCalleeParam$3, tmpCalleeParam$5);
  const two$1 = a$1.slice(2);
  return two$1;
};
const x = $spy(`x`);
const xs = $coerce(x, `plustr`);
const y = $spy(`y`);
const ys = $coerce(y, `plustr`);
const r = $frfr(f, xs, ys);
const s = $frfr(g, r, ys);
const rs = r + s;
$(rs);
`````

## Output


`````js filename=intro
const tmpFree /*:(string, string)=>primitive*/ = function $free($$0, $$1) {
  const xs$1 /*:string*/ = $$0;
  const ys$1 /*:string*/ = $$1;
  debugger;
  const tmpCalleeParam /*:string*/ = xs$1 + 5;
  const one /*:number*/ = parseInt(tmpCalleeParam, ys$1);
  const two /*:unknown*/ = one.slice(1);
  two + 0;
  const two$1 /*:unknown*/ = two.slice(2);
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

## PST Output

With rename=true

`````js filename=intro
const a = function b($$0,$$1 ) {
  const c = $$0;
  const d = $$1;
  debugger;
  const e = c + 5;
  const f = parseInt( e, d );
  const g = f.slice( 1 );
  g + 0;
  const h = g.slice( 2 );
  const i = g + h;
  return i;
};
const j = $spy( "x" );
const k = $coerce( j, "plustr" );
const l = $spy( "y" );
const m = $coerce( l, "plustr" );
const n = o( a, k, m );
$( n );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['x', 'x']
 - 2: '$spy[1].valueOf()', 'x'
 - 3: 'Creating spy', 2, 1, ['y', 'y']
 - 4: '$spy[2].valueOf()', 'y'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
