# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > For b > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
for (; (a = b?.c.d.e(1)); $(1));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpChainElementCall /*:unknown*/ = tmpObjLitVal$1.e(1);
if (tmpChainElementCall) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpChainElementCall$1 /*:unknown*/ = tmpObjLitVal$1.e(1);
    a = tmpChainElementCall$1;
    if (tmpChainElementCall$1) {
    } else {
      break;
    }
  }
  $(a);
} else {
  $(tmpChainElementCall);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpObjLitVal$1 = { e: $ };
const tmpChainElementCall = tmpObjLitVal$1.e(1);
if (tmpChainElementCall) {
  while (true) {
    $(1);
    const tmpChainElementCall$1 = tmpObjLitVal$1.e(1);
    a = tmpChainElementCall$1;
    if (!tmpChainElementCall$1) {
      break;
    }
  }
  $(a);
} else {
  $(tmpChainElementCall);
}
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
{
  while ((a = b?.c.d.e(1))) {
    $(1);
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
while (true) {
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementObject$1 = tmpChainElementObject.d;
    const tmpChainElementCall = tmpChainElementObject$1.e(1);
    a = tmpChainElementCall;
  } else {
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { e: $ };
const c = b.e( 1 );
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const d = b.e( 1 );
    a = d;
    if (d) {

    }
    else {
      break;
    }
  }
  $( a );
}
else {
  $( c );
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
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check
- Calling a static method on an ident that is not global and not recorded: $tmpObjLitVal$1_e
