# Preval test case

# second_param_var_lhs_lit.md

> Static arg ops > Unary > Second param var lhs lit
>
> When a function uses a param in the first statement and it is only called then we may be able to outline the first statement

## Input

`````js filename=intro
function f(a, b) {
  const x = ~b;
  return x + a;
}

$(f(1, 2));
$(f(2, 100));
$(f('a', 'x'));
$(f(true, false));
`````

## Settled


`````js filename=intro
$(-2);
$(-99);
$(`-1a`);
$(0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-2);
$(-99);
$(`-1a`);
$(0);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const x = ~b;
  return x + a;
};
$(f(1, 2));
$(f(2, 100));
$(f(`a`, `x`));
$(f(true, false));
`````

## Normalized


`````js filename=intro
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const x = ~b;
  const tmpReturnArg = x + a;
  return tmpReturnArg;
};
const tmpCalleeParam = f(1, 2);
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(2, 100);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = f(`a`, `x`);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 = f(true, false);
$(tmpCalleeParam$5);
`````

## PST Settled
With rename=true

`````js filename=intro
$( -2 );
$( -99 );
$( "-1a" );
$( 0 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: -2
 - 2: -99
 - 3: '-1a'
 - 4: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
