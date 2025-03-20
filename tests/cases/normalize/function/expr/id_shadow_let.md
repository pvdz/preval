# Preval test case

# id_shadow_let.md

> Normalize > Function > Expr > Id shadow let
>
> Function recursion by referencing a function expr id

## Input

`````js filename=intro
const f = function r() {
  let r = 20; // Ignored. r is read-only but the write fails silently.
  $(typeof r);
  return r;
};
const x = f();
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
