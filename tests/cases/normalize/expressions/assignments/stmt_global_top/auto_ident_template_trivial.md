# Preval test case

# auto_ident_template_trivial.md

> Normalize > Expressions > Assignments > Stmt global top > Auto ident template trivial
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = `foo`;
$(a);
`````


## Settled


`````js filename=intro
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "foo" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
