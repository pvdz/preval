# Preval test case

# auto_ident_opt_method_call_simple.md

> normalize > expressions > assignments > switch_case_test > auto_ident_opt_method_call_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = b?.c(1)):
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    let tmpBinBothRhs;
    let tmpNestedComplexRhs = undefined;
    const tmpChainRootProp = b;
    if (tmpChainRootProp) {
      const tmpChainElementObject = tmpChainRootProp.c;
      const tmpChainElementCall = tmpChainElementObject.call(tmpChainRootProp, 1);
      tmpNestedComplexRhs = tmpChainElementCall;
    }
    a = tmpNestedComplexRhs;
    tmpBinBothRhs = tmpNestedComplexRhs;
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    tmpFallthrough = true;
  }
}
$(a);
`````

## Output

`````js filename=intro
({ c: $ });
let a = { a: 999, b: 1000 };
$(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    let tmpBinBothRhs;
    let tmpNestedComplexRhs = undefined;
    const tmpChainRootProp = b;
    if (tmpChainRootProp) {
      const tmpChainElementObject = tmpChainRootProp.c;
      const tmpChainElementCall = tmpChainElementObject.call(tmpChainRootProp, 1);
      tmpNestedComplexRhs = tmpChainElementCall;
    }
    a = tmpNestedComplexRhs;
    tmpBinBothRhs = tmpNestedComplexRhs;
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    tmpFallthrough = true;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 1
 - eval returned: ('<crash[ <ref> is not defined ]>')
