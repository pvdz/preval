# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> normalize > expressions > assignments > param_default > auto_ident_opt_c-mem_call_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f(p = (a = $(b)?.[$("$")]?.($(1)))) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs = undefined;
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
        tmpNestedComplexRhs = tmpChainElementCall$1;
      }
    }
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
  }
}
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam$2 = f();
tmpCallCallee(tmpCalleeParam$2);
$(a);
`````

## Output

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs = undefined;
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
        tmpNestedComplexRhs = tmpChainElementCall$1;
      }
    }
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
  }
}
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCalleeParam$2 = f();
$(tmpCalleeParam$2);
$(a);
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: undefined
 - 6: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same