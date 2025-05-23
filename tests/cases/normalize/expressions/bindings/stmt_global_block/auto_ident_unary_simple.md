# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident unary simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let x = 1;

  let a = typeof x;
  $(a, x);
}
`````


## Settled


`````js filename=intro
$(`number`, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`number`, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "number", 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let a = typeof x;
$(a, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
