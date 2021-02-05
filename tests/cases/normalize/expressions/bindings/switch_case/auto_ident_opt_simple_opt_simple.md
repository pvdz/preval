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
  let b;
  let a;
  {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      ('case 0:');
      {
        const tmpObjLitVal = { y: 1 };
        b = { x: tmpObjLitVal };
        a = undefined;
        const tmpChainRootProp = b;
        if (tmpChainRootProp) {
          const tmpChainElementObject = tmpChainRootProp.x;
          if (tmpChainElementObject) {
            const tmpChainElementObject$1 = tmpChainElementObject.y;
            a = tmpChainElementObject$1;
          }
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
let b;
let a;
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  tmpIfTest = true;
}
if (tmpIfTest) {
  const tmpObjLitVal = { y: 1 };
  b = { x: tmpObjLitVal };
  a = undefined;
  const tmpChainRootProp = b;
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.x;
    if (tmpChainElementObject) {
      const tmpChainElementObject$1 = tmpChainElementObject.y;
      a = tmpChainElementObject$1;
    }
  }
  $(a);
  tmpFallthrough = true;
}
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
