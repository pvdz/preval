# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident object empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = {};
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:object*/ = {};
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({});
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
$( a );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
