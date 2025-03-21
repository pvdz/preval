# Preval test case

# group_literal.md

> Normalize > Member access > Statement > Func > Group literal
>
> We shouldn't transform member expressions on group ending in a literal

## Input

`````js filename=intro
function f() {
  ($(1), 2).foo;
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
(2).foo;
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
(2).foo;
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
2.foo;
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
