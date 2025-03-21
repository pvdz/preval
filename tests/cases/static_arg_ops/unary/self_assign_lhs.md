# Preval test case

# self_assign_lhs.md

> Static arg ops > Unary > Self assign lhs
>
> When a function uses a param in the first statement and it is only called then we may be able to outline the first statement

## Input

`````js filename=intro
function f(a) {
  a = ~a;
  return a;
}

$(f(1));
$(f(2));
$(f('a'));
$(f(true));
`````


## Settled


`````js filename=intro
$(-2);
$(-3);
$(-1);
$(-2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-2);
$(-3);
$(-1);
$(-2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -2 );
$( -3 );
$( -1 );
$( -2 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -2
 - 2: -3
 - 3: -1
 - 4: -2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
