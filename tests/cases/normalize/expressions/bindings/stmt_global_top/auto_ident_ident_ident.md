# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident ident ident
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = (b = 2);
$(a, b, c);
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let c = 2;
b = 2;
let a = b;
$(b, b, c);
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
