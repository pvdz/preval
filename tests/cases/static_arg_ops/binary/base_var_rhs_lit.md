# Preval test case

# base_var_rhs_lit.md

> Static arg ops > Binary > Base var rhs lit
>
> When a function uses a param in the first statement and it is only called then we may be able to outline the first statement

## Input

`````js filename=intro
function f(a) {
  const x = 1 + a;
  return x + 2;
}

$(f(1));
$(f(2));
$(f('a'));
$(f(true));
`````

## Settled


`````js filename=intro
$(4);
$(5);
$(`1a2`);
$(4);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
$(5);
$(`1a2`);
$(4);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  const x = 1 + a;
  return x + 2;
};
$(f(1));
$(f(2));
$(f(`a`));
$(f(true));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  const x = 1 + a;
  const tmpReturnArg = x + 2;
  return tmpReturnArg;
};
const tmpCalleeParam = f(1);
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(2);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = f(`a`);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 = f(true);
$(tmpCalleeParam$5);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 4 );
$( 5 );
$( "1a2" );
$( 4 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 4
 - 2: 5
 - 3: '1a2'
 - 4: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
