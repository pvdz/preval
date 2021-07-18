# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($)?.($(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = $($)?.($(1));
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  $(100);
  tmpDoWhileFlag = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpCallCallee = $dotCall;
    const tmpCalleeParam = tmpChainElementCall;
    const tmpCalleeParam$1 = tmpChainRootCall;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
    tmpDoWhileFlag = tmpChainElementCall$1;
  } else {
  }
}
$(a);
`````

## Output

`````js filename=intro
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  $(100);
  tmpDoWhileFlag = undefined;
  const tmpChainElementCall = $($);
  const tmpIfTest = tmpChainElementCall == null;
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, tmpCalleeParam$3);
    tmpDoWhileFlag = tmpChainElementCall$1;
  }
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - 5: 100
 - 6: '<$>'
 - 7: 1
 - 8: 1
 - 9: 100
 - 10: '<$>'
 - 11: 1
 - 12: 1
 - 13: 100
 - 14: '<$>'
 - 15: 1
 - 16: 1
 - 17: 100
 - 18: '<$>'
 - 19: 1
 - 20: 1
 - 21: 100
 - 22: '<$>'
 - 23: 1
 - 24: 1
 - 25: 100
 - 26: '<$>'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
