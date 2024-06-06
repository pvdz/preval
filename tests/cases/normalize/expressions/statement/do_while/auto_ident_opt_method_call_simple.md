# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (b?.c(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if (b?.c(1)) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  let tmpIfTest = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
    tmpIfTest = tmpChainElementCall;
  } else {
  }
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const b = { c: $ };
const a = { a: 999, b: 1000 };
let $tmpLoopUnrollCheck = true;
$(100);
const tmpChainElementCall = $dotCall($, b, 1);
if (tmpChainElementCall) {
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpChainElementObject$1 = b.c;
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, b, 1);
    if (tmpChainElementCall$1) {
    } else {
      break;
    }
  }
} else {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: $ };
const b = {
a: 999,
b: 1000
;
let c = true;
$( 100 );
const d = $dotCall( $, a, 1 );
if (d) {

}
else {
  c = false;
}
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const e = a.c;
    const f = $dotCall( e, a, 1 );
    if (f) {

    }
    else {
      break;
    }
  }
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 100
 - 4: 1
 - 5: 100
 - 6: 1
 - 7: 100
 - 8: 1
 - 9: 100
 - 10: 1
 - 11: 100
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 100
 - 16: 1
 - 17: 100
 - 18: 1
 - 19: 100
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 100
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
