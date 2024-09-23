# Preval test case

# unused_spread_param_multi-params.md

> Rest > Param > Unused > Unused spread param multi-params
>
> A function with a spread param that we know will not receive any args should be an empty array

## Input

`````js filename=intro
function f(a, b, ...rest) {
  $(a, b, rest);
}
f(1, 2);
f('a', 'b');
f($spy(), $spy());
`````

## Pre Normal


`````js filename=intro
let f = function ($$0, $$1, ...$$2) {
  let a = $$0;
  let b = $$1;
  let rest = $$2;
  debugger;
  $(a, b, rest);
};
f(1, 2);
f(`a`, `b`);
f($spy(), $spy());
`````

## Normalized


`````js filename=intro
let f = function ($$0, $$1, ...$$2) {
  let a = $$0;
  let b = $$1;
  let rest = $$2;
  debugger;
  $(a, b, rest);
  return undefined;
};
f(1, 2);
f(`a`, `b`);
const tmpCallCallee = f;
const tmpCalleeParam = $spy();
const tmpCalleeParam$1 = $spy();
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const f /*:(unknown, unknown)=>*/ = function ($$0, $$1) {
  const a = $$0;
  const b = $$1;
  debugger;
  const rest /*:array*/ = [];
  $(a, b, rest);
  return undefined;
};
f(1, 2);
f(`a`, `b`);
const tmpCalleeParam = $spy();
const tmpCalleeParam$1 = $spy();
f(tmpCalleeParam, tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = c;
  const d = e;
  debugger;
  const f = [];
  $( b, d, f );
  return undefined;
};
a( 1, 2 );
a( "a", "b" );
const g = $spy();
const h = $spy();
a( g, h );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 2, []
 - 2: 'a', 'b', []
 - 3: 'Creating spy', 1, 0, ['spy', 12345]
 - 4: 'Creating spy', 2, 0, ['spy', 12345]
 - 5: '<spy[1]>', '<spy[2]>', []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
