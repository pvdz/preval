# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> normalize > expressions > statement > for_b > auto_ident_opt_c-mem_call_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(b)?.[$("$")]?.($(1)); $(1));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while (true) {
    let tmpIfTest = undefined;
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
        tmpIfTest = tmpChainElementCall$1;
      }
    }
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while (true) {
    let tmpIfTest = undefined;
    const tmpChainElementCall = $(b);
    if (tmpChainElementCall) {
      const tmpChainRootComputed = $('$');
      const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
      if (tmpChainElementObject) {
        const tmpCallObj = tmpChainElementObject;
        const tmpCallVal = tmpCallObj.call;
        const tmpCalleeParam = tmpChainElementCall;
        const tmpCalleeParam$1 = $(1);
        const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
        tmpIfTest = tmpChainElementCall$1;
      }
    }
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: { $: '"<$>"' }
 - 7: '$'
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: { $: '"<$>"' }
 - 12: '$'
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: { $: '"<$>"' }
 - 17: '$'
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: { $: '"<$>"' }
 - 22: '$'
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: { $: '"<$>"' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same