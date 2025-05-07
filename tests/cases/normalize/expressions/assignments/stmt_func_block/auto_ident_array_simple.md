# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = [1, 2, 3];
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:array*/ = [1, 2, 3];
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2, 3]);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
$( undefined );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
