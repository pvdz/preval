# Preval test case

# auto_ident_unary_typeof_complex.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_unary_typeof_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let arg = 1;

  let a = typeof $(arg);
  $(a, arg);
}
`````

## Normalized

`````js filename=intro
{
  let arg = 1;
  const tmpUnaryArg = $(arg);
  let a = typeof tmpUnaryArg;
  $(a, arg);
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
