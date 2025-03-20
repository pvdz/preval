# Preval test case

# second_param_var_rhs_lit.md

> Static arg ops > Binary > Second param var rhs lit
>
> When a function uses a param in the first statement and it is only called then we may be able to outline the first statement

## Input

`````js filename=intro
function f(a, b) {
  const x = 1 + b;
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
$(`1xa`);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
$(103);
$(`1xa`);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4 );
$( 103 );
$( "1xa" );
$( 2 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4
 - 2: 103
 - 3: '1xa'
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
