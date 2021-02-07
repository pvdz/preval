# Preval test case

# auto_ident_opt_simple_opt_simple.md

> normalize > expressions > assignments > switch_case_top > auto_ident_opt_simple_opt_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = b?.x?.y;
}
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    const tmpBinBothRhs = $(1);
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      a = undefined;
      const tmpChainRootProp = b;
      if (tmpChainRootProp) {
        const tmpChainElementObject = tmpChainRootProp.x;
        if (tmpChainElementObject) {
          const tmpChainElementObject$1 = tmpChainElementObject.y;
          a = tmpChainElementObject$1;
        }
      }
    }
    tmpFallthrough = true;
  }
}
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
({ x: tmpObjLitVal });
let a = { a: 999, b: 1000 };
$(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    const tmpBinBothRhs = $(1);
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      a = undefined;
      const tmpChainRootProp = b;
      if (tmpChainRootProp) {
        const tmpChainElementObject = tmpChainRootProp.x;
        if (tmpChainElementObject) {
          const tmpChainElementObject$1 = tmpChainElementObject.y;
          a = tmpChainElementObject$1;
        }
      }
    }
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
