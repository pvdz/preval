# Preval test case

# base_expr_lhs_lit.md

> Static arg ops > Binary > Base expr lhs lit
>
> When a function uses a param in the first statement and it is only called then we may be able to outline the first statement

## Input

`````js filename=intro
function f(a) {
  a + 1;
  return $(100);
}

$(f(1));
$(f(2));
$(f('a'));
$(f(true));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:unknown*/ = $(100);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:unknown*/ = $(100);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:unknown*/ = $(100);
$(tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
$($(100));
$($(100));
$($(100));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
const b = $( 100 );
$( b );
const c = $( 100 );
$( c );
const d = $( 100 );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  a + 0;
  const tmpReturnArg = $(100);
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
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: 100
 - 5: 100
 - 6: 100
 - 7: 100
 - 8: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
