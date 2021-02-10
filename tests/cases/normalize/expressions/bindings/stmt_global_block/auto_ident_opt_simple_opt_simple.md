# Preval test case

# auto_ident_opt_simple_opt_simple.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_opt_simple_opt_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { x: { y: 1 } };

  let a = b?.x?.y;
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  const tmpObjLitVal = { y: 1 };
  let b = { x: tmpObjLitVal };
  let a = undefined;
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
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
