# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Bindings > Switch case > Auto ident opt method call extended
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: { d: { e: $ } } };

    let a = b?.c.d.e(1);
    $(a);
}
`````

## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpChainElementCall /*:unknown*/ = tmpObjLitVal$1.e(1);
$(tmpChainElementCall);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ e: $ }.e(1));
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let b;
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    b = { c: { d: { e: $ } } };
    a = b?.c.d.e(1);
    $(a);
  } else {
  }
}
`````

## Normalized


`````js filename=intro
let b = undefined;
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  const tmpObjLitVal$1 = { e: $ };
  const tmpObjLitVal = { d: tmpObjLitVal$1 };
  b = { c: tmpObjLitVal };
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementObject$1 = tmpChainElementObject.d;
    const tmpChainElementCall = tmpChainElementObject$1.e(1);
    a = tmpChainElementCall;
    $(tmpChainElementCall);
  } else {
    $(a);
  }
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { e: $ };
const b = a.e( 1 );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
