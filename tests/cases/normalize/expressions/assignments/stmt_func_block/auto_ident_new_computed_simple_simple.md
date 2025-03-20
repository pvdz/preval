# Preval test case

# auto_ident_new_computed_simple_simple.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident new computed simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = { a: 999, b: 1000 };
    a = new b["$"](1);
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpClusterSSA_a /*:object*/ = new $(1);
$(tmpClusterSSA_a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(new $(1));
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
$( a );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: {}
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
