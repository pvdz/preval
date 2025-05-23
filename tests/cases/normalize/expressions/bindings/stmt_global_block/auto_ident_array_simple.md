# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident array simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let a = [1, 2, 3];
  $(a);
}
`````


## Settled


`````js filename=intro
const a /*:array*/ = [1, 2, 3];
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2, 3]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = [1, 2, 3];
$(a);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
