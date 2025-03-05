# Preval test case

# i_o.md

> Frfr tricks > Back to back > I o
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
  const tmpCallCallee = parseInt;
  const tmpCalleeParam = a + 5;
  const tmpCalleeParam$1 = b;
  const one = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  const two = one.slice(1);
  return two;
};
const g = function $free($$0, $$1) {
  let a$1 = $$0;
  let b$1 = $$1;
  debugger;
  const tmpCallCallee$1 = parseInt;
  const tmpCalleeParam$3 = a$1 + 500;
  const tmpCalleeParam$5 = b$1;
  const one$1 = tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
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
const tmpFree /*:()=>primitive*/ = function $free() {
  debugger;
  const tmpCalleeParam /*:string*/ = xs + 5;
  const one /*:number*/ = parseInt(tmpCalleeParam, ys);
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
const rs /*:primitive*/ = $frfr(tmpFree);
$(rs);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  const c = d + 5;
  const e = parseInt( c, f );
  const g = e.slice( 1 );
  g + 0;
  const h = g.slice( 2 );
  const i = g + h;
  return i;
};
const j = $spy( "x" );
const d = $coerce( j, "plustr" );
const k = $spy( "y" );
const f = $coerce( k, "plustr" );
const l = m( a );
$( l );
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
