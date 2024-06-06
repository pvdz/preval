# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > For c > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
for (; $(1); a = b?.c(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = b?.c(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    a = undefined;
    const tmpChainRootProp = b;
    const tmpIfTest$1 = tmpChainRootProp != null;
    if (tmpIfTest$1) {
      const tmpChainElementObject = tmpChainRootProp.c;
      const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
      a = tmpChainElementCall;
    } else {
    }
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  const b = { c: $ };
  $dotCall($, b, 1);
  let tmpClusterSSA_tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      const tmpChainElementObject$1 = b.c;
      $dotCall(tmpChainElementObject$1, b, 1);
      tmpClusterSSA_tmpIfTest = $(1);
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = { c: $ };
  $dotCall( $, b, 1 );
  let c = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (c) {
      const d = b.c;
      $dotCall( d, b, 1 );
      c = $( 1 );
    }
    else {
      break;
    }
  }
}
const e = {
a: 999,
b: 1000
;
$( e );
`````

## Globals

None

## Result

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

Final output calls: Same
