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
const f = function $free($$0) {
  let a = $$0;
  debugger;
  const one = a + 5;
  const two = one.slice(1);
  return two;
};
const g = function $free($$0) {
  let a$1 = $$0;
  debugger;
  const one$1 = a$1 + 100;
  const two$1 = a$1.slice(2);
  return two$1;
};
const x = $spy(`x`);
const xs = x + ``;
const y = $spy(`y`);
const ys = y + ``;
const r = $frfr(f, xs, ys);
const s = $frfr(g, xs, ys);
const rs = r + s;
$(rs);
`````

## Normalized


`````js filename=intro
const f = function $free($$0) {
  let a = $$0;
  debugger;
  const one = a + 5;
  const two = one.slice(1);
  return two;
};
const g = function $free($$0) {
  let a$1 = $$0;
  debugger;
  const one$1 = a$1 + 100;
  const two$1 = a$1.slice(2);
  return two$1;
};
const x = $spy(`x`);
const xs = $coerce(x, `plustr`);
const y = $spy(`y`);
const ys = $coerce(y, `plustr`);
const r = $frfr(f, xs, ys);
const s = $frfr(g, xs, ys);
const rs = r + s;
$(rs);
`````

## Output


`````js filename=intro
const tmpFree /*:()=>string*/ = function $free() {
  debugger;
  const one /*:string*/ = xs + 5;
  const two /*:string*/ = one.slice(1);
  const s /*:string*/ = xs.slice(2);
  const tmpRet /*:string*/ = two + s;
  return tmpRet;
};
const x /*:unknown*/ = $spy(`x`);
const xs /*:string*/ = $coerce(x, `plustr`);
const y /*:unknown*/ = $spy(`y`);
$coerce(y, `plustr`);
const rs /*:string*/ = $frfr(tmpFree);
$(rs);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  const c = d + 5;
  const e = c.slice( 1 );
  const f = d.slice( 2 );
  const g = e + f;
  return g;
};
const h = $spy( "x" );
const d = $coerce( h, "plustr" );
const i = $spy( "y" );
$coerce( i, "plustr" );
const j = k( a );
$( j );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['x', 'x']
 - 2: '$spy[1].valueOf()', 'x'
 - 3: 'Creating spy', 2, 1, ['y', 'y']
 - 4: '$spy[2].valueOf()', 'y'
 - 5: '5'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
