# Preval test case

# auto_ident_unary_void_simple.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_unary_void_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let x = 1;

  let a = void x;
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let x = 1;
  let a = undefined;
  $(a);
}
`````

## Output

`````js filename=intro
{
  let x = 1;
  let a = undefined;
  $(a);
}
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
