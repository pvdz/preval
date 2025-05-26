# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
throw b?.c(1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: $ };
const tmpClusterSSA_tmpThrowArg /*:unknown*/ = $dotCall($, b, `c`, 1);
throw tmpClusterSSA_tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpThrowArg = $dotCall($, { c: $ }, `c`, 1);
throw tmpClusterSSA_tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = $dotCall( $, a, "c", 1 );
throw b;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
let tmpThrowArg = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, `c`, 1);
  tmpThrowArg = tmpChainElementCall;
} else {
}
throw tmpThrowArg;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
