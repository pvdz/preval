# Preval test case

# middle_param_single_prop2.md

> Inline identical param > Objlit > Middle param single prop2
>
>

## Input

`````js filename=intro
const f = function(x, a, y) {
  let obj = { a: a };
  const tmpCalleeParam$3 = obj.a;
  $(x, y, tmpCalleeParam$3);
};
const tmpCalleeParam$7 = { a: 1 };
f(1, tmpCalleeParam$7, `y`);
const tmpCalleeParam$13 = { a: 3 };
f(3, tmpCalleeParam$13, `z`);
`````

## Pre Normal


`````js filename=intro
const f = function ($$0, $$1, $$2) {
  let x = $$0;
  let a = $$1;
  let y = $$2;
  debugger;
  let obj = { a: a };
  const tmpCalleeParam$3 = obj.a;
  $(x, y, tmpCalleeParam$3);
};
const tmpCalleeParam$7 = { a: 1 };
f(1, tmpCalleeParam$7, `y`);
const tmpCalleeParam$13 = { a: 3 };
f(3, tmpCalleeParam$13, `z`);
`````

## Normalized


`````js filename=intro
const f = function ($$0, $$1, $$2) {
  let x = $$0;
  let a = $$1;
  let y = $$2;
  debugger;
  let obj = { a: a };
  const tmpCalleeParam$3 = obj.a;
  $(x, y, tmpCalleeParam$3);
  return undefined;
};
const tmpCalleeParam$7 = { a: 1 };
f(1, tmpCalleeParam$7, `y`);
const tmpCalleeParam$13 = { a: 3 };
f(3, tmpCalleeParam$13, `z`);
`````

## Output


`````js filename=intro
const tmpCalleeParam$7 /*:object*/ = { a: 1 };
$(1, `y`, tmpCalleeParam$7);
const tmpCalleeParam$13 /*:object*/ = { a: 3 };
$(3, `z`, tmpCalleeParam$13);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { a: 1 };
$( 1, "y", a );
const b = { a: 3 };
$( 3, "z", b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'y', { a: '1' }
 - 2: 3, 'z', { a: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
