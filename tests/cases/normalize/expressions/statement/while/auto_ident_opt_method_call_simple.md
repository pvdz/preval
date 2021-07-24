# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > While > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
while (b?.c(1)) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
while (b?.c(1)) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
while (true) {
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
    $(100);
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
while (true) {
  const tmpChainElementObject = b.c;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, b, 1);
  if (tmpChainElementCall) {
    $(100);
  } else {
    break;
  }
}
$(a);
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
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
