# Preval test case

# auto_ident_opt_call_complex_simple.md

> normalize > expressions > assignments > switch_case_block > auto_ident_opt_call_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = $($)?.(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
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
      const tmpChainElementCall = tmpChainRootCall($);
      if (tmpChainElementCall) {
        const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
        a = tmpChainElementCall$1;
      }
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
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
      const tmpChainElementCall = tmpChainRootCall($);
      if (tmpChainElementCall) {
        const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
        a = tmpChainElementCall$1;
      }
    }
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
