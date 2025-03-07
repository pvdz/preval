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

## Settled


`````js filename=intro
const tmpCalleeParam$7 /*:object*/ = { a: 1 };
$(1, `y`, tmpCalleeParam$7);
const tmpCalleeParam$13 /*:object*/ = { a: 3 };
$(3, `z`, tmpCalleeParam$13);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, `y`, { a: 1 });
$(3, `z`, { a: 3 });
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

## PST Settled
With rename=true

`````js filename=intro
const a = { a: 1 };
$( 1, "y", a );
const b = { a: 3 };
$( 3, "z", b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1, 'y', { a: '1' }
 - 2: 3, 'z', { a: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
