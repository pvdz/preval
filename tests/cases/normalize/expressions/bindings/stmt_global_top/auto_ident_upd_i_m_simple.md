# Preval test case

# auto_ident_upd_i_m_simple.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident upd i m simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = b--;
$(a, b);
`````


## Settled


`````js filename=intro
$(1, 0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, 0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1, 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent - 1;
let a = tmpPostUpdArgIdent;
$(tmpPostUpdArgIdent, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
