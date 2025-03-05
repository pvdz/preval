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

## Pre Normal


`````js filename=intro
const f = function $free($$0, $$1, $$2) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  const one = parseInt(a + 5, b);
  const two = one.slice(1, c);
  return two;
};
const x = $spy(`x`);
const xs = x + ``;
const y = $spy(`y`);
const ys = y + ``;
const r = $frfr(f, xs, 10, ys);
const rs = r + ``;
$(rs);
`````

## Normalized


`````js filename=intro
const f = function $free($$0, $$1, $$2) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  const tmpCalleeParam = a + 5;
  const tmpCalleeParam$1 = b;
  const one = parseInt(tmpCalleeParam, tmpCalleeParam$1);
  const two = one.slice(1, c);
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

## Output


`````js filename=intro
const tmpFree /*:(string, string)=>string*/ = function $free($$0, $$1) {
  const xs$1 /*:string*/ = $$0;
  const ys$1 /*:string*/ = $$1;
  debugger;
  const tmpCalleeParam /*:string*/ = xs$1 + 5;
  const one /*:number*/ = parseInt(tmpCalleeParam, 10);
  const two /*:unknown*/ = one.slice(1, ys$1);
  const tmpRet /*:string*/ = $coerce(two, `plustr`);
  return tmpRet;
};
const x /*:unknown*/ = $spy(`x`);
const xs /*:string*/ = $coerce(x, `plustr`);
const y /*:unknown*/ = $spy(`y`);
const ys /*:string*/ = $coerce(y, `plustr`);
const rs /*:string*/ = $frfr(tmpFree, xs, ys);
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
  const f = parseInt( e, 10 );
  const g = f.slice( 1, d );
  const h = $coerce( g, "plustr" );
  return h;
};
const i = $spy( "x" );
const j = $coerce( i, "plustr" );
const k = $spy( "y" );
const l = $coerce( k, "plustr" );
const m = n( a, j, l );
$( m );
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
