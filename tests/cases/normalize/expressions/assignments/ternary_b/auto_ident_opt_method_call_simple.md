# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
$($(1) ? (a = b?.c(1)) : $(200));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const b /*:object*/ = { c: $ };
  const tmpChainElementCall /*:unknown*/ = b.c(1);
  $(tmpChainElementCall);
  $(tmpChainElementCall);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpChainElementCall = { c: $ }.c(1);
  $(tmpChainElementCall);
  $(tmpChainElementCall);
} else {
  $($(200));
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = { c: $ };
  const c = b.c( 1 );
  $( c );
  $( c );
}
else {
  const d = $( 200 );
  $( d );
  const e = {
    a: 999,
    b: 1000,
  };
  $( e );
}
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
