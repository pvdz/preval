# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Ternary c > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$(0) ? $(100) : b?.c.d.e?.(1);
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  const tmpIfTest$3 /*:boolean*/ = $ == null;
  if (tmpIfTest$3) {
    $(a);
  } else {
    const tmpObjLitVal$1 /*:object*/ = { e: $ };
    $dotCall($, tmpObjLitVal$1, `e`, 1);
    $(a);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(0);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  if ($ == null) {
    $(a);
  } else {
    $dotCall($, { e: $ }, `e`, 1);
    $(a);
  }
}
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
$(0) ? $(100) : b?.c.d.e?.(1);
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementObject$1 = tmpChainElementObject.d;
    const tmpChainElementObject$3 = tmpChainElementObject$1.e;
    const tmpIfTest$3 = tmpChainElementObject$3 != null;
    if (tmpIfTest$3) {
      const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, `e`, 1);
      $(a);
    } else {
      $(a);
    }
  } else {
    $(a);
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( 100 );
  $( b );
}
else {
  const c = $ == null;
  if (c) {
    $( b );
  }
  else {
    const d = { e: $ };
    $dotCall( $, d, "e", 1 );
    $( b );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
