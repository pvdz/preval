# Preval test case

# optional_chain_known_obj.md

> Tofix > Optional chain known obj
>
> Need to sanitize this example but if we know that a value is an object
> then we can safely drop `?.` applied to it, in all its variations.

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
while ((a = b?.c(1))) $(100);
$(a);
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
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
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

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
const b = { c: $ };
const tmpChainElementCall = $dotCall($, b, 1);
let tmpClusterSSA_a = tmpChainElementCall;
if (tmpChainElementCall) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpChainElementObject$1 = b.c;
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, b, 1);
    tmpClusterSSA_a = tmpChainElementCall$1;
    if (tmpChainElementCall$1) {
      $(100);
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
const b = { c: $ };
const c = $dotCall( $, b, 1 );
let d = c;
if (c) {
  $( 100 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const e = b.c;
    const f = $dotCall( e, b, 1 );
    d = f;
    if (f) {
      $( 100 );
    }
    else {
      break;
    }
  }
}
$( d );
`````

## Globals

None

## Result

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

Final output calls: Same
