# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Bindings > Export > Auto ident opt method opt call extended
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

export let a = b?.c.d.e?.(1);
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = $ == null;
if (tmpIfTest$1) {
} else {
  const tmpObjLitVal$1 /*:object*/ /*truthy*/ = { e: $ };
  a = $dotCall($, tmpObjLitVal$1, `e`, 1);
}
export { a };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
if (!($ == null)) {
  a = $dotCall($, { e: $ }, `e`, 1);
}
export { a };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
if (b) {

}
else {
  const c = { e: $ };
  a = $dotCall( $, c, "e", 1 );
}
export { a as a };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpIfTest$1 = tmpChainElementObject$3 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, `e`, 1);
    a = tmpChainElementCall;
  } else {
  }
} else {
}
export { a };
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
