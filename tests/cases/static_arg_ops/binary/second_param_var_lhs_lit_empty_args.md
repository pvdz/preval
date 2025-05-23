# Preval test case

# second_param_var_lhs_lit_empty_args.md

> Static arg ops > Binary > Second param var lhs lit empty args
>
> When a function uses a param in the first statement and it is only called then we may be able to outline the first statement

## Input

`````js filename=intro
function f(no, noo, nooo, a, b) {
  const x = !b;
  return x + a;
}

$(f(1, 2));
$(f(2, 100));
$(f('a', 'x'));
$(f(true, false));
`````


## Settled


`````js filename=intro
$($Number_NaN);
$($Number_NaN);
$($Number_NaN);
$($Number_NaN);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_NaN);
$($Number_NaN);
$($Number_NaN);
$($Number_NaN);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Number_NaN );
$( $Number_NaN );
$( $Number_NaN );
$( $Number_NaN );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1, $$2, $$3, $$4) {
  let no = $$0;
  let noo = $$1;
  let nooo = $$2;
  let a = $$3;
  let b = $$4;
  debugger;
  const x = !b;
  const tmpReturnArg = x + a;
  return tmpReturnArg;
};
let tmpCalleeParam = f(1, 2);
$(tmpCalleeParam);
let tmpCalleeParam$1 = f(2, 100);
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = f(`a`, `x`);
$(tmpCalleeParam$3);
let tmpCalleeParam$5 = f(true, false);
$(tmpCalleeParam$5);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: NaN
 - 3: NaN
 - 4: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
