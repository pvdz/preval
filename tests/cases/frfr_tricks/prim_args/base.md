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
  const tmpCallCallee = parseInt;
  const tmpCalleeParam = a + 5;
  const tmpCalleeParam$1 = b;
  const one = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
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
const tmpFree /*:()=>string*/ = function $free() {
  debugger;
  const tmpCalleeParam /*:string*/ = xs + 5;
  const one /*:number*/ = parseInt(tmpCalleeParam, 10);
  const two /*:unknown*/ = one.slice(1, ys);
  const tmpRet /*:string*/ = $coerce(two, `plustr`);
  return tmpRet;
};
const x /*:unknown*/ = $spy(`x`);
const xs /*:string*/ = $coerce(x, `plustr`);
const y /*:unknown*/ = $spy(`y`);
const ys /*:string*/ = $coerce(y, `plustr`);
const rs /*:string*/ = $frfr(tmpFree);
$(rs);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  const c = d + 5;
  const e = parseInt( c, 10 );
  const f = e.slice( 1, g );
  const h = $coerce( f, "plustr" );
  return h;
};
const i = $spy( "x" );
const d = $coerce( i, "plustr" );
const j = $spy( "y" );
const g = $coerce( j, "plustr" );
const k = l( a );
$( k );
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
