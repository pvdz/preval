# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Statement > Switch w default case test > Auto ident opt c-mem call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(b)?.[$("$")]?.($(1)):
    break;
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
let tmpBinLhs = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest$1 = tmpChainElementCall != null;
if (tmpIfTest$1) {
  const tmpChainRootComputed = $('$');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$2 = tmpChainElementObject != null;
  if (tmpIfTest$2) {
    const tmpCallObj = tmpChainElementObject;
    const tmpCallVal = tmpCallObj.call;
    const tmpCalleeParam = tmpChainElementCall;
    const tmpCalleeParam$1 = $(1);
    const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
    tmpBinLhs = tmpChainElementCall$1;
  }
}
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$3 = 2 === tmpSwitchTest;
  if (tmpIfTest$3) {
    tmpSwitchCaseToStart = 2;
  }
}
tmpSwitchBreak: {
  const tmpIfTest$4 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$4) {
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$5) {
      $('fail1');
    }
    const tmpIfTest$6 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$6) {
      $('fail2');
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
let tmpBinLhs = undefined;
const tmpChainElementCall = $(b);
const tmpIfTest$1 = tmpChainElementCall != null;
if (tmpIfTest$1) {
  const tmpChainRootComputed = $('$');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$2 = tmpChainElementObject != null;
  if (tmpIfTest$2) {
    const tmpCallVal = tmpChainElementObject.call;
    const tmpCalleeParam$1 = $(1);
    const tmpChainElementCall$1 = tmpCallVal.call(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$1);
    tmpBinLhs = tmpChainElementCall$1;
  }
}
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$3 = 2 === tmpSwitchTest;
  if (tmpIfTest$3) {
    tmpSwitchCaseToStart = 2;
  }
}
tmpSwitchBreak: {
  const tmpIfTest$4 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$4) {
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$5) {
      $('fail1');
    }
    const tmpIfTest$6 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$6) {
      $('fail2');
    }
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
