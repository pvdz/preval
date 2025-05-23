# Preval test case

# second_param_var_lhs_lit.md

> Static arg ops > Binary > Second param var lhs lit
>
> When a function uses a param in the first statement and it is only called then we may be able to outline the first statement

## Input

`````js filename=intro
function f(a, b) {
  const x = b + 1;
  return x + a;
}

$(f(1, 2));
$(f(2, 100));
$(f('a', 'x'));
$(f(true, false));
`````


## Settled


`````js filename=intro
$(4);
$(103);
$(`x1a`);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
$(103);
$(`x1a`);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4 );
$( 103 );
$( "x1a" );
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const x = b + 1;
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
 - 1: 4
 - 2: 103
 - 3: 'x1a'
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
