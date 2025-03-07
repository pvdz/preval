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

## Settled


`````js filename=intro
$(`x`, `y`, 1);
$(`w`, `z`, 3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`x`, `y`, 1);
$(`w`, `z`, 3);
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
  const tmpCalleeParam = x;
  const tmpCalleeParam$1 = y;
  const tmpCalleeParam$3 = obj.a;
  $(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  return undefined;
};
const tmpCallCallee = f;
const tmpCalleeParam$5 = { a: 1 };
tmpCallCallee(`x`, tmpCalleeParam$5, `y`);
const tmpCallCallee$1 = f;
const tmpCalleeParam$7 = { a: 3 };
tmpCallCallee$1(`w`, tmpCalleeParam$7, `z`);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "x", "y", 1 );
$( "w", "z", 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'x', 'y', 1
 - 2: 'w', 'z', 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
