# Preval test case

# auto_ident_opt_method_call_simple.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_opt_method_call_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { c: $ };

  let a = b?.c(1);
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let b = { c: $ };
  let a = undefined;
  const tmpChainRootProp = b;
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementCall = tmpChainElementObject.call(tmpChainRootProp, 1);
    a = tmpChainElementCall;
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
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
