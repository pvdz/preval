# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> normalize > expressions > assignments > regular_prop_obj > auto_ident_opt_c-mem_call_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
(a = $(b)?.[$("$")]?.($(1))).a;
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
a = undefined;
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
    a = tmpChainElementCall$1;
  }
}
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
a = undefined;
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
    a = tmpChainElementCall$1;
  }
}
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same