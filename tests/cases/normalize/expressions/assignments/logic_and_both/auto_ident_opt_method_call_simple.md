# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
$((a = b?.c(1)) && (a = b?.c(1)));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: $ };
const tmpChainElementCall /*:unknown*/ = b.c(1);
if (tmpChainElementCall) {
  const tmpChainElementCall$1 /*:unknown*/ = b.c(1);
  $(tmpChainElementCall$1);
  $(tmpChainElementCall$1);
} else {
  $(tmpChainElementCall);
  $(tmpChainElementCall);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: $ };
const tmpChainElementCall = b.c(1);
if (tmpChainElementCall) {
  const tmpChainElementCall$1 = b.c(1);
  $(tmpChainElementCall$1);
  $(tmpChainElementCall$1);
} else {
  $(tmpChainElementCall);
  $(tmpChainElementCall);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = a.c( 1 );
if (b) {
  const c = a.c( 1 );
  $( c );
  $( c );
}
else {
  $( b );
  $( b );
}
`````


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
