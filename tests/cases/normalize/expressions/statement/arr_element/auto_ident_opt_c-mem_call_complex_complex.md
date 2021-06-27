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
$(b)?.[$(`\$`)]?.($(1)) + $(b)?.[$(`\$`)]?.($(1));
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
  const tmpChainRootComputed = $(`\$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpCallCallee = $dotCall;
    const tmpCalleeParam = tmpChainElementObject;
    const tmpCalleeParam$1 = tmpChainElementCall;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
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
  const tmpChainRootComputed$1 = $(`\$`);
  const tmpChainElementObject$1 = tmpChainElementCall$3[tmpChainRootComputed$1];
  const tmpIfTest$5 = tmpChainElementObject$1 != null;
  if (tmpIfTest$5) {
    const tmpCallCallee$1 = $dotCall;
    const tmpCalleeParam$5 = tmpChainElementObject$1;
    const tmpCalleeParam$7 = tmpChainElementCall$3;
    const tmpCalleeParam$9 = $(1);
    const tmpChainElementCall$5 = tmpCallCallee$1(tmpCalleeParam$5, tmpCalleeParam$7, tmpCalleeParam$9);
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
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed = $(`\$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject == null;
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$3);
    tmpBinBothLhs = tmpChainElementCall$1;
  }
}
let tmpBinBothRhs = undefined;
const tmpChainElementCall$3 = $(b);
const tmpIfTest$3 = tmpChainElementCall$3 == null;
if (tmpIfTest$3) {
} else {
  const tmpChainRootComputed$1 = $(`\$`);
  const tmpChainElementObject$1 = tmpChainElementCall$3[tmpChainRootComputed$1];
  const tmpIfTest$5 = tmpChainElementObject$1 == null;
  if (tmpIfTest$5) {
  } else {
    const tmpCalleeParam$9 = $(1);
    const tmpChainElementCall$5 = $dotCall(tmpChainElementObject$1, tmpChainElementCall$3, tmpCalleeParam$9);
    tmpBinBothRhs = tmpChainElementCall$5;
  }
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
