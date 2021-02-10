# Preval test case

# auto_ident_opt_extended.md

> normalize > expressions > assignments > switch_case_top > auto_ident_opt_extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = b?.x.y.z;
}
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
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
    {
      a = undefined;
      const tmpChainRootProp = b;
      if (tmpChainRootProp) {
        const tmpChainElementObject = tmpChainRootProp.x;
        const tmpChainElementObject$1 = tmpChainElementObject.y;
        const tmpChainElementObject$2 = tmpChainElementObject$1.z;
        a = tmpChainElementObject$2;
      }
    }
    tmpFallthrough = true;
  }
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
