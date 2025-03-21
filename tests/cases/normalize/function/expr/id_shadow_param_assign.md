# Preval test case

# id_shadow_param_assign.md

> Normalize > Function > Expr > Id shadow param assign
>
> Function recursion by referencing a function expr id

## Input

`````js filename=intro
const f = function r(r) {
  r = 20;
  $(typeof r);
  return r;
};
const x = f(10);
$(x, typeof f);
`````


## Settled


`````js filename=intro
$(`number`);
$(20, `function`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`number`);
$(20, `function`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "number" );
$( 20, "function" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'number'
 - 2: 20, 'function'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
