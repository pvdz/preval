# Preval test case

# auto_base_assign_ident.md

> normalize > expressions > bindings > stmt_global_block > auto_base_assign_ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = 1;

  let a = (b = $(2));
  $(a, b);
}
`````

## Normalized

`````js filename=intro
{
  let b = 1;
  b = $(2);
  let a = b;
  $(a, b);
}
`````

## Output

`````js filename=intro
{
  let b = 1;
  b = $(2);
  let a = b;
  $(a, b);
}
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
