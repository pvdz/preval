# Preval test case

# auto_ident_opt_simple_opt_simple.md

> normalize > expressions > bindings > switch_w_default_case > auto_ident_opt_simple_opt_simple
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
  default:
    $("fail1");
  case 2:
    $("fail2");
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
  } else {
    const tmpIfTest$1 = 2 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 2;
    }
  }
  {
    const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$2) {
      tmpObjLitVal = { y: 1 };
      b = { x: tmpObjLitVal };
      a = undefined;
      tmpChainRootProp = b;
      const tmpIfTest$3 = tmpChainRootProp != null;
      if (tmpIfTest$3) {
        const tmpChainElementObject = tmpChainRootProp.x;
        const tmpIfTest$4 = tmpChainElementObject != null;
        if (tmpIfTest$4) {
          const tmpChainElementObject$1 = tmpChainElementObject.y;
          a = tmpChainElementObject$1;
        }
      }
      $(a);
    }
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
  } else {
    const tmpIfTest$1 = 2 === 1;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 2;
    }
  }
  {
    const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$2) {
      tmpObjLitVal = { y: 1 };
      b = { x: tmpObjLitVal };
      a = undefined;
      tmpChainRootProp = b;
      const tmpIfTest$3 = tmpChainRootProp != null;
      if (tmpIfTest$3) {
        const tmpChainElementObject = tmpChainRootProp.x;
        const tmpIfTest$4 = tmpChainElementObject != null;
        if (tmpIfTest$4) {
          const tmpChainElementObject$1 = tmpChainElementObject.y;
          a = tmpChainElementObject$1;
        }
      }
      $(a);
    }
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
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'fail1'
 - 3: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
