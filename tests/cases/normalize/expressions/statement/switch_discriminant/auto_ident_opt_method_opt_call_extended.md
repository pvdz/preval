# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
switch (b?.c.d.e?.(1)) {
  default:
    $(100);
}
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest$1 /*:boolean*/ = $ == null;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest$1) {
  $(100);
  $(a);
} else {
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  $dotCall($, tmpObjLitVal$1, `e`, 1);
  $(100);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest$1 = $ == null;
const a = { a: 999, b: 1000 };
if (tmpIfTest$1) {
  $(100);
  $(a);
} else {
  $dotCall($, { e: $ }, `e`, 1);
  $(100);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = b?.c.d.e?.(1);
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
let tmpSwitchDisc = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpIfTest$1 = tmpChainElementObject$3 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, `e`, 1);
    tmpSwitchDisc = tmpChainElementCall;
    $(100);
    $(a);
  } else {
    $(100);
    $(a);
  }
} else {
  $(100);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( 100 );
  $( b );
}
else {
  const c = { e: $ };
  $dotCall( $, c, "e", 1 );
  $( 100 );
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
