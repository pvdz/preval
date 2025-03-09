# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$($(1) ? (a = b?.c.d.e?.(1)) : $(200));
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpIfTest$3 /*:boolean*/ = $ == null;
  if (tmpIfTest$3) {
    $(undefined);
    $(undefined);
  } else {
    const tmpObjLitVal$1 /*:object*/ = { e: $ };
    const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
    $(tmpChainElementCall);
    $(tmpChainElementCall);
  }
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  if ($ == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainElementCall = $dotCall($, { e: $ }, `e`, 1);
    $(tmpChainElementCall);
    $(tmpChainElementCall);
  }
} else {
  $($(200));
  $({ a: 999, b: 1000 });
}
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
$($(1) ? (a = b?.c.d.e?.(1)) : $(200));
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementObject$1 = tmpChainElementObject.d;
    const tmpChainElementObject$3 = tmpChainElementObject$1.e;
    const tmpIfTest$3 = tmpChainElementObject$3 != null;
    if (tmpIfTest$3) {
      const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, `e`, 1);
      tmpNestedComplexRhs = tmpChainElementCall;
    } else {
    }
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $ == null;
  if (b) {
    $( undefined );
    $( undefined );
  }
  else {
    const c = { e: $ };
    const d = $dotCall( $, c, "e", 1 );
    $( d );
    $( d );
  }
}
else {
  const e = $( 200 );
  $( e );
  const f = {
    a: 999,
    b: 1000,
  };
  $( f );
}
`````

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
