# Preval test case

# auto_ident_opt_simple_opt_simple.md

> normalize > expressions > assignments > switch_case_test > auto_ident_opt_simple_opt_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = b?.x?.y):
}
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
{
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    let tmpBinBothRhs;
    let tmpNestedComplexRhs = undefined;
    const tmpChainRootProp = b;
    if (tmpChainRootProp) {
      const tmpChainElementObject = tmpChainRootProp.x;
      if (tmpChainElementObject) {
        const tmpChainElementObject$1 = tmpChainElementObject.y;
        tmpNestedComplexRhs = tmpChainElementObject$1;
      }
    }
    a = tmpNestedComplexRhs;
    tmpBinBothRhs = tmpNestedComplexRhs;
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
    }
    tmpFallthrough = true;
  }
}
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  const tmpBinBothLhs = tmpSwitchTest;
  let tmpBinBothRhs;
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootProp = b;
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.x;
    if (tmpChainElementObject) {
      const tmpChainElementObject$1 = tmpChainElementObject.y;
      tmpNestedComplexRhs = tmpChainElementObject$1;
    }
  }
  a = tmpNestedComplexRhs;
  tmpBinBothRhs = tmpNestedComplexRhs;
  tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
}
if (tmpIfTest) {
  tmpFallthrough = true;
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
