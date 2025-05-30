# Preval test case

# auto_ident_computed_simple_simple.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident computed simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 1 };

    let a = { a: 999, b: 1000 };
    a = b["c"];
    $(a, b);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
$(1, b);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, { c: 1 });
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
$( 1, a );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, { c: '1' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
