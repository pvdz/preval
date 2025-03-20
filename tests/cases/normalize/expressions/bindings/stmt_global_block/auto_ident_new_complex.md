# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident new complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let a = new ($($))(1);
  $(a);
}
`````


## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
const a /*:object*/ = new tmpNewCallee(1);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $($);
$(new tmpNewCallee(1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = new a( 1 );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
