# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Stmt global block > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
{
  let b = 1,
    c = 2;

  let a = { a: 999, b: 1000 };
  a = b = 2;
  $(a, b, c);
}
`````


## Settled


`````js filename=intro
$(2, 2, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2, 2, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2, 2, 2 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
