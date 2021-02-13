# Preval test case

# auto_ident_func_anon.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_func_anon
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = function () {};
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let a = function () {};
  $(a);
}
`````

## Output

`````js filename=intro
{
  let a = function () {};
  $(a);
}
`````

## Result

Should call `$` with:
 - 1: 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same