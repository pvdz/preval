# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident logic and simple complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let a = 1 && $($(1));
  $(a);
}
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($($(1)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
