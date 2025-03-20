# Preval test case

# auto_ident_call_prop_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident call prop simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = b.$(1);
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const a /*:unknown*/ = b.$(1);
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ $: $ }.$(1));
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = a.$( 1 );
$( b );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
