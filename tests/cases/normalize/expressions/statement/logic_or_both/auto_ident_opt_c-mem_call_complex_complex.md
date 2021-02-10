# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> normalize > expressions > statement > logic_or_both > auto_ident_opt_c-mem_call_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(b)?.[$("$")]?.($(1)) || $(b)?.[$("$")]?.($(1));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
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
} else {
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$2 = tmpChainRootCall$1(b);
  if (tmpChainElementCall$2) {
    const tmpChainRootComputed$1 = $('$');
    const tmpChainElementObject$1 = tmpChainElementCall$2[tmpChainRootComputed$1];
    if (tmpChainElementObject$1) {
      const tmpCallObj$1 = tmpChainElementObject$1;
      const tmpCallVal$1 = tmpCallObj$1.call;
      const tmpCalleeParam$2 = tmpChainElementCall$2;
      const tmpCalleeParam$3 = $(1);
      const tmpChainElementCall$3 = tmpCallVal$1.call(tmpCallObj$1, tmpCalleeParam$2, tmpCalleeParam$3);
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
