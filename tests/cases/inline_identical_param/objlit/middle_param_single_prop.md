# Preval test case

# middle_param_single_prop.md

> Inline identical param > Objlit > Middle param single prop
>
>

## Input

`````js filename=intro
function f(x, obj, y) {
  $(x, y, obj.a);
}

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
  $(x, y, obj.a);
};
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
  const tmpCallCallee = $;
  const tmpCalleeParam = x;
  const tmpCalleeParam$1 = y;
  const tmpCalleeParam$3 = obj.a;
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  return undefined;
};
const tmpCallCallee$1 = f;
const tmpCalleeParam$5 = `x`;
const tmpCalleeParam$7 = { a: 1 };
const tmpCalleeParam$9 = `y`;
tmpCallCallee$1(tmpCalleeParam$5, tmpCalleeParam$7, tmpCalleeParam$9);
const tmpCallCallee$3 = f;
const tmpCalleeParam$11 = `w`;
const tmpCalleeParam$13 = { a: 3 };
const tmpCalleeParam$15 = `z`;
tmpCallCallee$3(tmpCalleeParam$11, tmpCalleeParam$13, tmpCalleeParam$15);
`````

## Output


`````js filename=intro
$(`x`, `y`, 1);
$(`w`, `z`, 3);
`````

## PST Output

With rename=true

`````js filename=intro
$( "x", "y", 1 );
$( "w", "z", 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x', 'y', 1
 - 2: 'w', 'z', 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
