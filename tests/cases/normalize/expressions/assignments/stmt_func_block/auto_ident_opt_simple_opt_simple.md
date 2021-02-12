# Preval test case

# auto_ident_opt_simple_opt_simple.md

> normalize > expressions > assignments > stmt_func_block > auto_ident_opt_simple_opt_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { x: { y: 1 } };

    let a = { a: 999, b: 1000 };
    a = b?.x?.y;
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    const tmpObjLitVal = { y: 1 };
    let b = { x: tmpObjLitVal };
    let a = { a: 999, b: 1000 };
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
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  {
    const tmpObjLitVal = { y: 1 };
    let b = { x: tmpObjLitVal };
    let a = { a: 999, b: 1000 };
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
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
