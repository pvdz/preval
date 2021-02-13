# Preval test case

# auto_ident_opt_simple_opt_simple.md

> normalize > expressions > statement > switch_case_block > auto_ident_opt_simple_opt_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    b?.x?.y;
  }
}
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
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
      const tmpChainRootProp = b;
      const tmpIfTest$2 = tmpChainRootProp != null;
      if (tmpIfTest$2) {
        const tmpChainElementObject = tmpChainRootProp.x;
        const tmpIfTest$3 = tmpChainElementObject != null;
        if (tmpIfTest$3) {
          const tmpChainElementObject$1 = tmpChainElementObject.y;
        }
      }
    }
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
      const tmpIfTest$2 = b != null;
      if (tmpIfTest$2) {
        const tmpChainElementObject = b.x;
        const tmpIfTest$3 = tmpChainElementObject != null;
        if (tmpIfTest$3) {
          const tmpChainElementObject$1 = tmpChainElementObject.y;
        }
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
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
