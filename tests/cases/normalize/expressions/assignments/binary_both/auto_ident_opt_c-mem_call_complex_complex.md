# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> normalize > expressions > assignments > binary_both > auto_ident_opt_c-mem_call_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = $(b)?.[$("$")]?.($(1))) + (a = $(b)?.[$("$")]?.($(1))));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $('$');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpCallObj = tmpChainElementObject;
    const tmpCallVal = tmpCallObj.call;
    const tmpCalleeParam$1 = tmpChainElementCall;
    const tmpCalleeParam$2 = $(1);
    const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam$1, tmpCalleeParam$2);
    a = tmpChainElementCall$1;
  }
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$2 = tmpChainRootCall$1(b);
const tmpIfTest$2 = tmpChainElementCall$2 != null;
if (tmpIfTest$2) {
  const tmpChainRootComputed$1 = $('$');
  const tmpChainElementObject$1 = tmpChainElementCall$2[tmpChainRootComputed$1];
  const tmpIfTest$3 = tmpChainElementObject$1 != null;
  if (tmpIfTest$3) {
    const tmpCallObj$1 = tmpChainElementObject$1;
    const tmpCallVal$1 = tmpCallObj$1.call;
    const tmpCalleeParam$3 = tmpChainElementCall$2;
    const tmpCalleeParam$4 = $(1);
    const tmpChainElementCall$3 = tmpCallVal$1.call(tmpCallObj$1, tmpCalleeParam$3, tmpCalleeParam$4);
    a = tmpChainElementCall$3;
  }
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $('$');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpCallVal = tmpChainElementObject.call;
    const tmpCalleeParam$2 = $(1);
    const tmpChainElementCall$1 = tmpCallVal.call(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$2);
    a = tmpChainElementCall$1;
  }
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainElementCall$2 = $(b);
const tmpIfTest$2 = tmpChainElementCall$2 != null;
if (tmpIfTest$2) {
  const tmpChainRootComputed$1 = $('$');
  const tmpChainElementObject$1 = tmpChainElementCall$2[tmpChainRootComputed$1];
  const tmpIfTest$3 = tmpChainElementObject$1 != null;
  if (tmpIfTest$3) {
    const tmpCallVal$1 = tmpChainElementObject$1.call;
    const tmpCalleeParam$4 = $(1);
    const tmpChainElementCall$3 = tmpCallVal$1.call(tmpChainElementObject$1, tmpChainElementCall$2, tmpCalleeParam$4);
    a = tmpChainElementCall$3;
  }
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: { $: '"<$>"' }
 - 6: '$'
 - 7: 1
 - 8: 1
 - 9: 2
 - 10: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
