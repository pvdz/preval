# Preval test case

# auto_ident_opt_s-seq.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_opt_s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { x: 1 };

  let a = (1, 2, b)?.x;
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let b = { x: 1 };
  let a = undefined;
  const tmpChainRootProp = b;
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.x;
    a = tmpChainElementObject;
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
