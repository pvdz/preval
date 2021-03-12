# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = $(b)?.[$("$")]?.($(1))) && (a = $(b)?.[$("$")]?.($(1))));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
$((a = $(b)?.[$('$')]?.($(1))) && (a = $(b)?.[$('$')]?.($(1))));
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
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
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
      tmpNestedComplexRhs = tmpChainElementCall$3;
    }
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
let SSA_a = undefined;
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
    SSA_a = tmpChainElementCall$1;
  }
}
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
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
      tmpNestedComplexRhs = tmpChainElementCall$3;
    }
  }
  SSA_a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

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
 - 9: 1
 - 10: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
