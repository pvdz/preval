# Preval test case

# auto_ident_opt_extended.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_opt_extended
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { x: { y: { z: 100 } } };

    let a = b?.x.y.z;
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    const tmpObjLitVal$1 = { z: 100 };
    const tmpObjLitVal = { y: tmpObjLitVal$1 };
    let b = { x: tmpObjLitVal };
    let a = undefined;
    const tmpChainRootProp = b;
    if (tmpChainRootProp) {
      const tmpChainElementObject = tmpChainRootProp.x;
      const tmpChainElementObject$1 = tmpChainElementObject.y;
      const tmpChainElementObject$2 = tmpChainElementObject$1.z;
      a = tmpChainElementObject$2;
    }
    $(a);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpObjLitVal$1 = { z: 100 };
  const tmpObjLitVal = { y: tmpObjLitVal$1 };
  let b = { x: tmpObjLitVal };
  let a = undefined;
  const tmpChainRootProp = b;
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.x;
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    const tmpChainElementObject$2 = tmpChainElementObject$1.z;
    a = tmpChainElementObject$2;
  }
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
