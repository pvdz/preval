# Preval test case

# global_lex.md

> Normalize > Naming > Global lex
>
> First a global binding shadowed by block binding

## Input

`````js filename=intro
let a = $(1);
$(a);
{
  let a = $(1);
  $(a);
}
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
$(a);
const a$1 /*:unknown*/ = $(1);
$(a$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1));
$($(1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
const b = $( 1 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = $(1);
$(a);
let a$1 = $(1);
$(a$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
