# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
export default a = b?.c(1);
$(a);
`````

## Settled


`````js filename=intro
let tmpAnonDefaultExport /*:unknown*/ = undefined;
const b /*:object*/ = { c: $ };
const tmpChainElementCall /*:unknown*/ = b.c(1);
tmpAnonDefaultExport = tmpChainElementCall;
export { tmpAnonDefaultExport as default };
$(tmpChainElementCall);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpAnonDefaultExport = undefined;
const tmpChainElementCall = { c: $ }.c(1);
tmpAnonDefaultExport = tmpChainElementCall;
export { tmpAnonDefaultExport as default };
$(tmpChainElementCall);
`````

## Pre Normal


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = b?.c(1));
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootProp.c(1);
  a = tmpChainElementCall;
} else {
}
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { c: $ };
const c = b.c( 1 );
a = c;
export { a as default };
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
