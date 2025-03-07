# Preval test case

# multi_use.md

> Static arg ops > Multi use
>
> The case where the param is used multiple times

## Input

`````js filename=intro
const f = function (a, b, c, d) {
  const x = b - 10;
  const y = c - -30;
  $(b, a, x, y);
};
f(100, `abc`, 200, 300);
f(400, `def`, 500, 600);
`````

## Settled


`````js filename=intro
$(`abc`, 100, NaN, 230);
$(`def`, 400, NaN, 530);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abc`, 100, NaN, 230);
$(`def`, 400, NaN, 530);
`````

## Pre Normal


`````js filename=intro
const f = function ($$0, $$1, $$2, $$3) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  debugger;
  const x = b - 10;
  const y = c - -30;
  $(b, a, x, y);
};
f(100, `abc`, 200, 300);
f(400, `def`, 500, 600);
`````

## Normalized


`````js filename=intro
const f = function ($$0, $$1, $$2, $$3) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  debugger;
  const x = b - 10;
  const y = c - -30;
  $(b, a, x, y);
  return undefined;
};
f(100, `abc`, 200, 300);
f(400, `def`, 500, 600);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "abc", 100, NaN, 230 );
$( "def", 400, NaN, 530 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'abc', 100, NaN, 230
 - 2: 'def', 400, NaN, 530
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
