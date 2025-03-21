# Preval test case

# auto_ident_call_prop_complex.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident call prop complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let b = { $ };

  let a = $(b).$(1);
  $(a);
}
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCallObj /*:unknown*/ = $(b);
const a /*:unknown*/ = tmpCallObj.$(1);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($({ $: $ }).$(1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$( 1 );
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
