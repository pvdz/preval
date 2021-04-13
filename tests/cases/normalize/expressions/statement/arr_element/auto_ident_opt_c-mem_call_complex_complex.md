# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident opt c-mem call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(b)?.[$("$")]?.($(1)) + $(b)?.[$("$")]?.($(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(b)?.[$('$')]?.($(1)) + $(b)?.[$('$')]?.($(1));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
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
    const tmpCalleeParam = tmpChainElementCall;
    const tmpCalleeParam$1 = $(1);
    const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
    tmpBinBothLhs = tmpChainElementCall$1;
  } else {
  }
} else {
}
let tmpBinBothRhs = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$3 = tmpChainRootCall$1(b);
const tmpIfTest$3 = tmpChainElementCall$3 != null;
if (tmpIfTest$3) {
  const tmpChainRootComputed$1 = $('$');
  const tmpChainElementObject$1 = tmpChainElementCall$3[tmpChainRootComputed$1];
  const tmpIfTest$5 = tmpChainElementObject$1 != null;
  if (tmpIfTest$5) {
    const tmpCallObj$1 = tmpChainElementObject$1;
    const tmpCallVal$1 = tmpCallObj$1.call;
    const tmpCalleeParam$3 = tmpChainElementCall$3;
    const tmpCalleeParam$5 = $(1);
    const tmpChainElementCall$5 = tmpCallVal$1.call(tmpCallObj$1, tmpCalleeParam$3, tmpCalleeParam$5);
    tmpBinBothRhs = tmpChainElementCall$5;
  } else {
  }
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $('$');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpCallVal = tmpChainElementObject.call;
    const tmpCalleeParam$1 = $(1);
    const tmpChainElementCall$1 = tmpCallVal.call(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$1);
    tmpBinBothLhs = tmpChainElementCall$1;
  } else {
  }
} else {
}
let tmpBinBothRhs = undefined;
const tmpChainElementCall$3 = $(b);
const tmpIfTest$3 = tmpChainElementCall$3 != null;
if (tmpIfTest$3) {
  const tmpChainRootComputed$1 = $('$');
  const tmpChainElementObject$1 = tmpChainElementCall$3[tmpChainRootComputed$1];
  const tmpIfTest$5 = tmpChainElementObject$1 != null;
  if (tmpIfTest$5) {
    const tmpCallVal$1 = tmpChainElementObject$1.call;
    const tmpCalleeParam$5 = $(1);
    const tmpChainElementCall$5 = tmpCallVal$1.call(tmpChainElementObject$1, tmpChainElementCall$3, tmpCalleeParam$5);
    tmpBinBothRhs = tmpChainElementCall$5;
  } else {
  }
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
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
 - 9: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
