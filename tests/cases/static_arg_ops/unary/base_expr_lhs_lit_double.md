# Preval test case

# base_expr_lhs_lit_double.md

> Static arg ops > Unary > Base expr lhs lit double
>
> When a function uses a param in the first statement and it is only called then we may be able to outline the first statement

## Input

`````js filename=intro
function f(a) {
  ~a;
  return a + 2;
}

$(f(1));
$(f(2));
$(f('a'));
$(f(true));
`````


## Settled


`````js filename=intro
$(3);
$(4);
$(`a2`);
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
$(4);
$(`a2`);
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
$( 4 );
$( "a2" );
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  +a;
  const tmpReturnArg = a + 2;
  return tmpReturnArg;
};
let tmpCalleeParam = f(1);
$(tmpCalleeParam);
let tmpCalleeParam$1 = f(2);
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = f(`a`);
$(tmpCalleeParam$3);
let tmpCalleeParam$5 = f(true);
$(tmpCalleeParam$5);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: 'a2'
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
