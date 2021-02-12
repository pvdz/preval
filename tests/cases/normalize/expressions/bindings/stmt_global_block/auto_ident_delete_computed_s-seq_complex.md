# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_delete_computed_s-seq_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let x = { y: 1 };

  let a = delete ($(1), $(2), x)[$("y")];
  $(a, x);
}
`````

## Normalized

`````js filename=intro
{
  let x = { y: 1 };
  $(1);
  $(2);
  const tmpDeleteCompObj = x;
  const tmpDeleteCompProp = $('y');
  let a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  $(a, x);
}
`````

## Output

`````js filename=intro
{
  let x = { y: 1 };
  $(1);
  $(2);
  const tmpDeleteCompObj = x;
  const tmpDeleteCompProp = $('y');
  let a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  $(a, x);
}
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'y'
 - 4: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
