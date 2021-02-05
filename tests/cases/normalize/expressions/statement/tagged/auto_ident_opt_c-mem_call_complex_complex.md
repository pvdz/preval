# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> normalize > expressions > statement > tagged > auto_ident_opt_c-mem_call_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$`before ${$(b)?.[$("$")]?.($(1))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1 = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
if (tmpChainElementCall) {
  const tmpChainRootComputed = $('$');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (tmpChainElementObject) {
    const tmpCallObj = tmpChainElementObject;
    const tmpCallVal = tmpCallObj.call;
    const tmpCalleeParam$2 = tmpChainElementCall;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam$2, tmpCalleeParam$3);
    tmpCalleeParam$1 = tmpChainElementCall$1;
  }
}
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1 = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
if (tmpChainElementCall) {
  const tmpChainRootComputed = $('$');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (tmpChainElementObject) {
    const tmpCallObj = tmpChainElementObject;
    const tmpCallVal = tmpCallObj.call;
    const tmpCalleeParam$2 = tmpChainElementCall;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam$2, tmpCalleeParam$3);
    tmpCalleeParam$1 = tmpChainElementCall$1;
  }
}
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: ['before ', ' after'], 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
