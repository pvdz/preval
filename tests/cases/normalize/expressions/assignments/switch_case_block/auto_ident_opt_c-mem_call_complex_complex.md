# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> normalize > expressions > assignments > switch_case_block > auto_ident_opt_c-mem_call_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = $(b)?.[$("$")]?.($(1));
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
{
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    {
      a = undefined;
      const tmpChainRootCall = $;
      const tmpChainElementCall = tmpChainRootCall(b);
      const tmpIfTest$2 = tmpChainElementCall != null;
      if (tmpIfTest$2) {
        const tmpChainRootComputed = $('$');
        const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
        const tmpIfTest$3 = tmpChainElementObject != null;
        if (tmpIfTest$3) {
          const tmpCallObj = tmpChainElementObject;
          const tmpCallVal = tmpCallObj.call;
          const tmpCalleeParam = tmpChainElementCall;
          const tmpCalleeParam$1 = $(1);
          const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
          a = tmpChainElementCall$1;
        }
      }
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
{
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    {
      a = undefined;
      const tmpChainElementCall = $(b);
      const tmpIfTest$2 = tmpChainElementCall != null;
      if (tmpIfTest$2) {
        const tmpChainRootComputed = $('$');
        const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
        const tmpIfTest$3 = tmpChainElementObject != null;
        if (tmpIfTest$3) {
          const tmpCallVal = tmpChainElementObject.call;
          const tmpCalleeParam$1 = $(1);
          const tmpChainElementCall$1 = tmpCallVal.call(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$1);
          a = tmpChainElementCall$1;
        }
      }
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
 - 2: 1
 - 3: { $: '"<$>"' }
 - 4: '$'
 - 5: 1
 - 6: 1
 - 7: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
