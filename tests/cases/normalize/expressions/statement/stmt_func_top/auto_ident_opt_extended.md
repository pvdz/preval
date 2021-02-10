# Preval test case

# auto_ident_opt_extended.md

> normalize > expressions > statement > stmt_func_top > auto_ident_opt_extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { x: { y: { z: 100 } } };

  let a = { a: 999, b: 1000 };
  b?.x.y.z;
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpObjLitVal$1 = { z: 100 };
  const tmpObjLitVal = { y: tmpObjLitVal$1 };
  let b = { x: tmpObjLitVal };
  let a = { a: 999, b: 1000 };
  const tmpChainRootProp = b;
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.x;
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    const tmpChainElementObject$2 = tmpChainElementObject$1.z;
  }
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
