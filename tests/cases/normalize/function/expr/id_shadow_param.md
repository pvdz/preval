# Preval test case

# id_shadow_param.md

> Normalize > Function > Expr > Id shadow param
>
> Function recursion by referencing a function expr id

## Input

`````js filename=intro
const f = function r(r) {
  $(typeof r);
  return r;
};
const x = f(10);
$(x, typeof f);
`````


## Settled


`````js filename=intro
$(`number`);
$(10, `function`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`number`);
$(10, `function`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "number" );
$( 10, "function" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'number'
 - 2: 10, 'function'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
