# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let b = 1;

  let a = $(b);
  $(a, b);
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
$(a, 1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1), 1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a, 1 );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1, 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
