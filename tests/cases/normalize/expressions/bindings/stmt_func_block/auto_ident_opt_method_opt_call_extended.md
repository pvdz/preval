# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident opt method opt call extended
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = { c: { d: { e: $ } } };

    let a = b?.c.d.e?.(1);
    $(a);
  }
}
$(f());
`````

## Settled


`````js filename=intro
const tmpIfTest$1 /*:boolean*/ = $ == null;
if (tmpIfTest$1) {
  $(undefined);
  $(undefined);
} else {
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
  $(tmpChainElementCall);
  $(undefined);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($ == null) {
  $(undefined);
  $(undefined);
} else {
  $($dotCall($, { e: $ }, `e`, 1));
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let b = { c: { d: { e: $ } } };
    let a = b?.c.d.e?.(1);
    $(a);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
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
      $(tmpChainElementCall);
      return undefined;
    } else {
      $(a);
      return undefined;
    }
  } else {
    $(a);
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
if (a) {
  $( undefined );
  $( undefined );
}
else {
  const b = { e: $ };
  const c = $dotCall( $, b, "e", 1 );
  $( c );
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
