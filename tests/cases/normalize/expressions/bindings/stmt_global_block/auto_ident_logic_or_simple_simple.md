# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident logic or simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let a = 0 || 2;
  $(a);
}
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = 0;
if (a) {
  $(a);
} else {
  a = 2;
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
