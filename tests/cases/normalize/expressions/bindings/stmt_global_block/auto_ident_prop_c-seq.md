# Preval test case

# auto_ident_prop_c-seq.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_prop_c-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { c: 1 };

  let a = (1, 2, $(b)).c;
  $(a, b);
}
`````

## Normalized

`````js filename=intro
{
  let b = { c: 1 };
  const tmpCompObj = $(b);
  let a = tmpCompObj.c;
  $(a, b);
}
`````

## Output

`````js filename=intro
{
  let b = { c: 1 };
  const tmpCompObj = $(b);
  let a = tmpCompObj.c;
  $(a, b);
}
`````

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
