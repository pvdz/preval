# Preval test case

# base_var_lhs_lit.md

> Static arg ops > Binary > Base var lhs lit
>
> When a function uses a param in the first statement and it is only called then we may be able to outline the first statement

## Input

`````js filename=intro
function f(a) {
  const x = a + 1;
  return x + 2;
}

$(f(1));
$(f(2));
$(f('a'));
$(f(true));
`````


## Settled


`````js filename=intro
$(4);
$(5);
$(`a12`);
$(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
$(5);
$(`a12`);
$(4);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4 );
$( 5 );
$( "a12" );
$( 4 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4
 - 2: 5
 - 3: 'a12'
 - 4: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
