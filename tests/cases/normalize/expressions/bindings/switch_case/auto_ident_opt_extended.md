# Preval test case

# auto_ident_opt_extended.md

> normalize > expressions > bindings > switch_case > auto_ident_opt_extended
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: { y: { z: 100 } } };

    let a = b?.x.y.z;
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
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      {
        tmpObjLitVal$1 = { z: 100 };
        tmpObjLitVal = { y: tmpObjLitVal$1 };
        b = { x: tmpObjLitVal };
        a = undefined;
        tmpChainRootProp = b;
        if (tmpChainRootProp) {
          const tmpChainElementObject = tmpChainRootProp.x;
          const tmpChainElementObject$1 = tmpChainElementObject.y;
          const tmpChainElementObject$2 = tmpChainElementObject$1.z;
          a = tmpChainElementObject$2;
        }
        $(a);
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
