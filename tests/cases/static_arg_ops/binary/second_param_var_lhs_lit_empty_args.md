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
$(NaN);
$(NaN);
$(NaN);
$(NaN);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(NaN);
$(NaN);
$(NaN);
$(NaN);
`````


## PST Settled
With rename=true

`````js filename=intro
$( NaN );
$( NaN );
$( NaN );
$( NaN );
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
