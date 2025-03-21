# Preval test case

# id_shadow_var_assign.md

> Normalize > Function > Expr > Id shadow var assign
>
> Function recursion by referencing a function expr id

## Input

`````js filename=intro
const f = function r() {
  var r = 20; // Ignored. r is read-only but the write fails silently.
  r = 30;
  $(typeof r);
  return r;
};
const x = f();
$(x, typeof f);
`````


## Settled


`````js filename=intro
$(`number`);
$(30, `function`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`number`);
$(30, `function`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "number" );
$( 30, "function" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'number'
 - 2: 30, 'function'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
