# Preval test case

# auto_ident_opt_simple_opt_simple.md

> normalize > expressions > bindings > switch_case > auto_ident_opt_simple_opt_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: { y: 1 } };

    let a = b?.x?.y;
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let tmpObjLitVal;
  let b;
  let a;
  let tmpChainRootProp;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      tmpObjLitVal = { y: 1 };
      b = { x: tmpObjLitVal };
      a = undefined;
      tmpChainRootProp = b;
      if (tmpChainRootProp) {
        const tmpChainElementObject = tmpChainRootProp.x;
        if (tmpChainElementObject) {
          const tmpChainElementObject$1 = tmpChainElementObject.y;
          a = tmpChainElementObject$1;
        }
      }
      $(a);
    }
  }
}
`````

## Output

`````js filename=intro
{
  let tmpObjLitVal;
  let b;
  let a;
  let tmpChainRootProp;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === 1;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      tmpObjLitVal = { y: 1 };
      b = { x: tmpObjLitVal };
      a = undefined;
      tmpChainRootProp = b;
      if (tmpChainRootProp) {
        const tmpChainElementObject = tmpChainRootProp.x;
        if (tmpChainElementObject) {
          const tmpChainElementObject$1 = tmpChainElementObject.y;
          a = tmpChainElementObject$1;
        }
      }
      $(a);
    }
  }
}
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same