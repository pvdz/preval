# Preval test case

# auto_ident_unary_complex.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_unary_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let x = 1;

  let a = typeof $(x);
  $(a, x);
}
`````

## Normalized

`````js filename=intro
{
  let x = 1;
  const tmpUnaryArg = $(x);
  let a = typeof tmpUnaryArg;
  $(a, x);
}
`````

## Output

`````js filename=intro
{
  const tmpUnaryArg = $(1);
  let a = typeof tmpUnaryArg;
  $(a, 1);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
