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


## PST Settled
With rename=true

`````js filename=intro
$( -2 );
$( -99 );
$( "-1a" );
$( 0 );
`````


## Todos triggered


None


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
