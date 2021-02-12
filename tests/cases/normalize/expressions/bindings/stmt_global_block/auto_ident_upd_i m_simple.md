# Preval test case

# auto_ident_upd_i m_simple.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_upd_i m_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = 1;

  let a = b--;
  $(a, b);
}
`````

## Normalized

`````js filename=intro
{
  let b = 1;
  const tmpPostUpdArgIdent = b;
  b = b - 1;
  let a = tmpPostUpdArgIdent;
  $(a, b);
}
`````

## Output

`````js filename=intro
{
  let b = 1;
  const tmpPostUpdArgIdent = b;
  b = b - 1;
  let a = tmpPostUpdArgIdent;
  $(a, b);
}
`````

## Result

Should call `$` with:
 - 1: 1, 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
