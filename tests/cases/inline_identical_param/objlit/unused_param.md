# Preval test case

# unused_param.md

> Inline identical param > Objlit > Unused param
>
>

## Input

`````js filename=intro
function f(x, obj, y) {
  $(x, y);
}
$(f);
f('x', {a: 1}, 'y');
f('w', {a: 3}, 'z');
`````

## Pre Normal


`````js filename=intro
let f = function ($$0, $$1, $$2) {
  let x = $$0;
  let obj = $$1;
  let y = $$2;
  debugger;
  $(x, y);
};
$(f);
f(`x`, { a: 1 }, `y`);
f(`w`, { a: 3 }, `z`);
`````

## Normalized


`````js filename=intro
let f = function ($$0, $$1, $$2) {
  let x = $$0;
  let obj = $$1;
  let y = $$2;
  debugger;
  $(x, y);
  return undefined;
};
$(f);
const tmpCallCallee = f;
const tmpCalleeParam = `x`;
const tmpCalleeParam$1 = { a: 1 };
const tmpCalleeParam$3 = `y`;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
const tmpCallCallee$1 = f;
const tmpCalleeParam$5 = `w`;
const tmpCalleeParam$7 = { a: 3 };
const tmpCalleeParam$9 = `z`;
tmpCallCallee$1(tmpCalleeParam$5, tmpCalleeParam$7, tmpCalleeParam$9);
`````

## Output


`````js filename=intro
const f /*:(unknown, unknown, unknown)=>undefined*/ = function ($$0, $$1, $$2) {
  const x = $$0;
  const y = $$2;
  debugger;
  $(x, y);
  return undefined;
};
$(f);
$(`x`, `y`);
$(`w`, `z`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2 ) {
  const b = $$0;
  const c = $$2;
  debugger;
  $( b, c );
  return undefined;
};
$( a );
$( "x", "y" );
$( "w", "z" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: 'x', 'y'
 - 3: 'w', 'z'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
