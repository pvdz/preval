# Preval test case

# bug.md

> Frfr tricks > Arg count mismatch > Bug
>
> $frfr with different arg count from the $free func it calls

This one led to changed behavior at the time of writing, whereas the 
version where f would slice `one` rather than `a` (base.md) worked fine.

## Input

`````js filename=intro
const f = function $free(a) {
  const one = a + 5;
  const two = a.slice(1);
  return two;
}

const x = $spy('x');
const xs = x + '';
const y = $spy('y');
const ys = y + '';
const r = $frfr(f, xs, ys);
$(r);
`````

## Pre Normal


`````js filename=intro
const f = function $free($$0) {
  let a = $$0;
  debugger;
  const one = a + 5;
  const two = a.slice(1);
  return two;
};
const x = $spy(`x`);
const xs = x + ``;
const y = $spy(`y`);
const ys = y + ``;
const r = $frfr(f, xs, ys);
$(r);
`````

## Normalized


`````js filename=intro
const f = function $free($$0) {
  let a = $$0;
  debugger;
  const one = a + 5;
  const two = a.slice(1);
  return two;
};
const x = $spy(`x`);
const xs = $coerce(x, `plustr`);
const y = $spy(`y`);
const ys = $coerce(y, `plustr`);
const r = $frfr(f, xs, ys);
$(r);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $spy(`x`);
const xs /*:string*/ = $coerce(x, `plustr`);
const y /*:unknown*/ = $spy(`y`);
$coerce(y, `plustr`);
const r /*:string*/ = xs.slice(1);
$(r);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy( "x" );
const b = $coerce( a, "plustr" );
const c = $spy( "y" );
$coerce( c, "plustr" );
const d = b.slice( 1 );
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['x', 'x']
 - 2: '$spy[1].valueOf()', 'x'
 - 3: 'Creating spy', 2, 1, ['y', 'y']
 - 4: '$spy[2].valueOf()', 'y'
 - 5: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- frfr and free arg mismatch