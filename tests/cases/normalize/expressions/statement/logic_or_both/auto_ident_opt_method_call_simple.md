# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Logic or both > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
b?.c(1) || b?.c(1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { c: $ };
const tmpClusterSSA_tmpIfTest /*:unknown*/ = $dotCall($, b, `c`, 1);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpClusterSSA_tmpIfTest) {
  $(a);
} else {
  const tmpChainElementObject$1 /*:unknown*/ = b.c;
  $dotCall(tmpChainElementObject$1, b, `c`, 1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: $ };
const tmpClusterSSA_tmpIfTest = $dotCall($, b, `c`, 1);
const a = { a: 999, b: 1000 };
if (tmpClusterSSA_tmpIfTest) {
  $(a);
} else {
  b.c(1);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = $dotCall( $, a, "c", 1 );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  $( c );
}
else {
  const d = a.c;
  $dotCall( d, a, "c", 1 );
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootProp = b;
const tmpIfTest$1 = tmpChainRootProp != null;
if (tmpIfTest$1) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, `c`, 1);
  tmpIfTest = tmpChainElementCall;
} else {
}
if (tmpIfTest) {
  $(a);
} else {
  const tmpChainRootProp$1 = b;
  const tmpIfTest$3 = tmpChainRootProp$1 != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject$1 = tmpChainRootProp$1.c;
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainRootProp$1, `c`, 1);
    $(a);
  } else {
    $(a);
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
