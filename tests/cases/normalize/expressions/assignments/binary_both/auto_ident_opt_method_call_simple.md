# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
$((a = b?.c(1)) + (a = b?.c(1)));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { c: $ };
const tmpClusterSSA_tmpBinBothLhs /*:unknown*/ = $dotCall($, b, `c`, 1);
const tmpChainElementObject$1 /*:unknown*/ = b.c;
const tmpClusterSSA_a$2 /*:unknown*/ = $dotCall(tmpChainElementObject$1, b, `c`, 1);
const tmpCalleeParam /*:primitive*/ = tmpClusterSSA_tmpBinBothLhs + tmpClusterSSA_a$2;
$(tmpCalleeParam);
$(tmpClusterSSA_a$2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: $ };
const tmpClusterSSA_tmpBinBothLhs = $dotCall($, b, `c`, 1);
const tmpClusterSSA_a$2 = b.c(1);
$(tmpClusterSSA_tmpBinBothLhs + tmpClusterSSA_a$2);
$(tmpClusterSSA_a$2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = $dotCall( $, a, "c", 1 );
const c = a.c;
const d = $dotCall( c, a, "c", 1 );
const e = b + d;
$( e );
$( d );
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
const tmpBinBothLhs = a;
a = undefined;
const tmpChainRootProp$1 = b;
const tmpIfTest$1 = tmpChainRootProp$1 != null;
if (tmpIfTest$1) {
  const tmpChainElementObject$1 = tmpChainRootProp$1.c;
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainRootProp$1, `c`, 1);
  a = tmpChainElementCall$1;
} else {
}
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) support Identifier as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
