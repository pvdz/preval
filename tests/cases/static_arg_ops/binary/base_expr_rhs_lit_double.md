# Preval test case

# base_expr_rhs_lit_double.md

> Static arg ops > Binary > Base expr rhs lit double
>
> When a function uses a param in the first statement and it is only called then we may be able to outline the first statement

## Input

`````js filename=intro
function f(a) {
  1 + a;
  return 2 + a;
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
$(`2a`);
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
$(4);
$(`2a`);
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
$( 4 );
$( "2a" );
$( 3 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: '2a'
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
