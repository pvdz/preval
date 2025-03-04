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

## Pre Normal


`````js filename=intro
const f = function $free($$0) {
  let a = $$0;
  debugger;
  const one = a + 5;
  const two = one.slice(1);
  return two;
};
const x = $(`x`);
const xs = x + ``;
const y = $(`y`);
const ys = y + ``;
const r = $frfr(f, xs, ys);
const t = r.repeat(2);
$(t);
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
const x = $(`x`);
const xs = $coerce(x, `plustr`);
const y = $(`y`);
const ys = $coerce(y, `plustr`);
const r = $frfr(f, xs, ys);
const t = r.repeat(2);
$(t);
`````

## Output


`````js filename=intro
const tmpFree /*:()=>string*/ = function $free() {
  debugger;
  const one /*:string*/ = xs + 5;
  const two /*:string*/ = one.slice(1);
  const tmpRet /*:string*/ = two.repeat(2);
  return tmpRet;
};
const x /*:unknown*/ = $(`x`);
const xs /*:string*/ = $coerce(x, `plustr`);
const y /*:unknown*/ = $(`y`);
$coerce(y, `plustr`);
const t /*:string*/ = $frfr(tmpFree);
$(t);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  const c = d + 5;
  const e = c.slice( 1 );
  const f = e.repeat( 2 );
  return f;
};
const g = $( "x" );
const d = $coerce( g, "plustr" );
const h = $( "y" );
$coerce( h, "plustr" );
const i = j( a );
$( i );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - 2: 'y'
 - 3: '55'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
