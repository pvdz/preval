# Preval test case

# init_after_decls_read_in_if.md

> Normalize > Hoisting > Init after decls read in if
>
> Reconcile var decl with its init after hoisting

This is the case where there's a var with init and a var decl. The var is used in a conditional.

## Input

`````js filename=intro
function f() {
  return $(x, 'returned');
}
var x = 10;
const y = $(x, 'final');
$(y);
`````


## Settled


`````js filename=intro
const y /*:unknown*/ = $(10, `final`);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(10, `final`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10, "final" );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10, 'final'
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
