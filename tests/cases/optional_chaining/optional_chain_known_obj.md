# Preval test case

# optional_chain_known_obj.md

> Optional chaining > Optional chain known obj
>
> Need to sanitize this example but if we know that a value is an object
> then we can safely drop `?.` applied to it, in all its variations.

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
while ((a = b?.c(1))) $(100);
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { c: $ };
const tmpChainElementCall /*:unknown*/ = b.c(1);
if (tmpChainElementCall) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpChainElementCall$1 /*:unknown*/ = b.c(1);
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
const b = { c: $ };
const tmpChainElementCall = b.c(1);
if (tmpChainElementCall) {
  while (true) {
    $(100);
    const tmpChainElementCall$1 = b.c(1);
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
let b = { c: $ };
let a = { a: 999, b: 1000 };
while ((a = b?.c(1))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
while (true) {
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = tmpChainRootProp.c(1);
    a = tmpChainElementCall;
  } else {
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
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
const b = { c: $ };
const c = b.c( 1 );
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const d = b.c( 1 );
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
 - 2: 100
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 100
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 100
 - 13: 1
 - 14: 100
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 100
 - 19: 1
 - 20: 100
 - 21: 1
 - 22: 100
 - 23: 1
 - 24: 100
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check
- Calling a static method on an ident that is not global and not recorded: $b_c
