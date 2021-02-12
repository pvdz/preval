# Preval test case

# auto_ident_unary_minus_simple.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_unary_minus_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let x = 1;

  let a = -x;
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let x = 1;
  let a = -x;
  $(a);
}
`````

## Output

`````js filename=intro
{
  let x = 1;
  let a = -x;
  $(a);
}
`````

## Result

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
