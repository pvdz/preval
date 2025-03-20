# Preval test case

# base_var_lhs_lit.md

> Static arg ops > Unary > Base var lhs lit
>
> When a function uses a param in the first statement and it is only called then we may be able to outline the first statement

## Input

`````js filename=intro
function f(a) {
  const x = ~a;
  return x + 2;
}

$(f(1));
$(f(2));
$(f('a'));
$(f(true));
`````


## Settled


`````js filename=intro
$(0);
$(-1);
$(1);
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
$(-1);
$(1);
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
$( -1 );
$( 1 );
$( 0 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: -1
 - 3: 1
 - 4: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
