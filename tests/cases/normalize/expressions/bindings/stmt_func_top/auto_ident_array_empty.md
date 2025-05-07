# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident array empty
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = [];
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:array*/ = [];
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([]);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( a );
$( undefined );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
