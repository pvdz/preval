# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
$((a = b?.c(1)) || (a = b?.c(1)));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: $ };
const a /*:unknown*/ = $dotCall($, b, `c`, 1);
if (a) {
  $(a);
  $(a);
} else {
  const tmpChainElementObject$1 /*:unknown*/ = b.c;
  const tmpNestedComplexRhs /*:unknown*/ = $dotCall(tmpChainElementObject$1, b, `c`, 1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: $ };
const a = $dotCall($, b, `c`, 1);
if (a) {
  $(a);
  $(a);
} else {
  const tmpNestedComplexRhs = b.c(1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = $dotCall( $, a, "c", 1 );
if (b) {
  $( b );
  $( b );
}
else {
  const c = a.c;
  const d = $dotCall( c, a, "c", 1 );
  $( d );
  $( d );
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
