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
const tmpClusterSSA_a$1 /*:unknown*/ = $dotCall($, b, `c`, 1);
if (tmpClusterSSA_a$1) {
  const tmpChainElementObject$1 /*:unknown*/ = b.c;
  const tmpClusterSSA_tmpNestedComplexRhs /*:unknown*/ = $dotCall(tmpChainElementObject$1, b, `c`, 1);
  $(tmpClusterSSA_tmpNestedComplexRhs);
  $(tmpClusterSSA_tmpNestedComplexRhs);
} else {
  $(tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: $ };
const tmpClusterSSA_a$1 = $dotCall($, b, `c`, 1);
if (tmpClusterSSA_a$1) {
  const tmpClusterSSA_tmpNestedComplexRhs = b.c(1);
  $(tmpClusterSSA_tmpNestedComplexRhs);
  $(tmpClusterSSA_tmpNestedComplexRhs);
} else {
  $(tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = $dotCall( $, a, "c", 1 );
if (b) {
  const c = a.c;
  const d = $dotCall( c, a, "c", 1 );
  $( d );
  $( d );
}
else {
  $( b );
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, `c`, 1);
  a = tmpChainElementCall;
} else {
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootProp$1 = b;
  const tmpIfTest$1 = tmpChainRootProp$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainRootProp$1.c;
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainRootProp$1, `c`, 1);
    tmpNestedComplexRhs = tmpChainElementCall$1;
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
} else {
  $(tmpCalleeParam);
  $(a);
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
