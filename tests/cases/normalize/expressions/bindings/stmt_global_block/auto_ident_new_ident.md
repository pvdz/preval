# Preval test case

# auto_ident_new_ident.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident new ident
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let a = new $(1);
  $(a);
}
`````


## Settled


`````js filename=intro
const a /*:object*/ = new $(1);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(new $(1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = new $(1);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
