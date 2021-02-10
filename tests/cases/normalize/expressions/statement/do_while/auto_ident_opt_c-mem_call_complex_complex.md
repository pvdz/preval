# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> normalize > expressions > statement > do_while > auto_ident_opt_c-mem_call_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($(b)?.[$("$")]?.($(1)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpDoWhileTest;
do {
  $(100);
  tmpDoWhileTest = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  if (tmpChainElementCall) {
    const tmpChainRootComputed = $('$');
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    if (tmpChainElementObject) {
      const tmpCallObj = tmpChainElementObject;
      const tmpCallVal = tmpCallObj.call;
      const tmpCalleeParam = tmpChainElementCall;
      const tmpCalleeParam$1 = $(1);
      const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
      tmpDoWhileTest = tmpChainElementCall$1;
    }
  }
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
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: 1
 - 6: 100
 - 7: { $: '"<$>"' }
 - 8: '$'
 - 9: 1
 - 10: 1
 - 11: 100
 - 12: { $: '"<$>"' }
 - 13: '$'
 - 14: 1
 - 15: 1
 - 16: 100
 - 17: { $: '"<$>"' }
 - 18: '$'
 - 19: 1
 - 20: 1
 - 21: 100
 - 22: { $: '"<$>"' }
 - 23: '$'
 - 24: 1
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
