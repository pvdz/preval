# Preval test case

# auto_ident_delete_computed_complex_complex.md

> normalize > expressions > assignments > stmt_global_block > auto_ident_delete_computed_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let arg = { y: 1 };

  let a = { a: 999, b: 1000 };
  a = delete $(arg)[$("y")];
  $(a, arg);
}
`````

## Normalized

`````js filename=intro
{
  let arg = { y: 1 };
  let a = { a: 999, b: 1000 };
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $('y');
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  $(a, arg);
}
`````

## Output

`````js filename=intro
{
  let arg = { y: 1 };
  let a = { a: 999, b: 1000 };
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $('y');
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  $(a, arg);
}
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
