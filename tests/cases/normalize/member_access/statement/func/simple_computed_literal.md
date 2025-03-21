# Preval test case

# simple_computed_literal.md

> Normalize > Member access > Statement > Func > Simple computed literal
>
> Member expressions with literal keys should be inlined

## Input

`````js filename=intro
function f() {
  const obj = {foo: 10};
  obj['foo'];
}
$(f());
`````


## Settled


`````js filename=intro
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
