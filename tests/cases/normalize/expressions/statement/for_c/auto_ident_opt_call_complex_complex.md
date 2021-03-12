# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > For c > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); $($)?.($(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    $($)?.($(1));
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall($);
    const tmpIfTest$1 = tmpChainElementCall != null;
    if (tmpIfTest$1) {
      const tmpCallObj = tmpChainElementCall;
      const tmpCallVal = tmpCallObj.call;
      const tmpCalleeParam = tmpChainRootCall;
      const tmpCalleeParam$1 = $(1);
      const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
    }
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpChainElementCall = $($);
    const tmpIfTest$1 = tmpChainElementCall != null;
    if (tmpIfTest$1) {
      const tmpCallVal = tmpChainElementCall.call;
      const tmpCalleeParam$1 = $(1);
      tmpCallVal.call(tmpChainElementCall, $, tmpCalleeParam$1);
    }
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
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: '<$>'
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: '<$>'
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: '<$>'
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: '<$>'
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: '<$>'
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
