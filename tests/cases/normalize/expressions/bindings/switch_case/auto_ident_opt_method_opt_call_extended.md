# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> normalize > expressions > bindings > switch_case > auto_ident_opt_method_opt_call_extended
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: { d: { e: $ } } };

    let a = b?.c.d.e?.(1);
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let tmpObjLitVal$1;
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
      tmpObjLitVal$1 = { e: $ };
      tmpObjLitVal = { d: tmpObjLitVal$1 };
      b = { c: tmpObjLitVal };
      a = undefined;
      tmpChainRootProp = b;
      if (tmpChainRootProp) {
        const tmpChainElementObject = tmpChainRootProp.c;
        const tmpChainElementObject$1 = tmpChainElementObject.d;
        const tmpChainElementObject$2 = tmpChainElementObject$1.e;
        if (tmpChainElementObject$2) {
          const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
          a = tmpChainElementCall;
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
  let tmpObjLitVal$1;
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
      tmpObjLitVal$1 = { e: $ };
      tmpObjLitVal = { d: tmpObjLitVal$1 };
      b = { c: tmpObjLitVal };
      a = undefined;
      tmpChainRootProp = b;
      if (tmpChainRootProp) {
        const tmpChainElementObject = tmpChainRootProp.c;
        const tmpChainElementObject$1 = tmpChainElementObject.d;
        const tmpChainElementObject$2 = tmpChainElementObject$1.e;
        if (tmpChainElementObject$2) {
          const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
          a = tmpChainElementCall;
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
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
