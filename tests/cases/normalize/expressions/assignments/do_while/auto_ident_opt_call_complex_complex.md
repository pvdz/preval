# Preval test case

# auto_ident_opt_call_complex_complex.md

> normalize > expressions > assignments > do_while > auto_ident_opt_call_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($)?.($(1))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileTest;
do {
  $(100);
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  if (tmpChainElementCall) {
    const tmpCallObj = tmpChainElementCall;
    const tmpCallVal = tmpCallObj.call;
    const tmpCalleeParam = tmpChainRootCall;
    const tmpCalleeParam$1 = $(1);
    const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
    tmpNestedComplexRhs = tmpChainElementCall$1;
  }
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

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

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
