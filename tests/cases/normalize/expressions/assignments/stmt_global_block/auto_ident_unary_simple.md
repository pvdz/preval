# Preval test case

# auto_ident_unary_simple.md

> normalize > expressions > assignments > stmt_global_block > auto_ident_unary_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let x = 1;

  let a = { a: 999, b: 1000 };
  a = typeof x;
  $(a, x);
}
`````

## Normalized

`````js filename=intro
{
  let x = 1;
  let a = { a: 999, b: 1000 };
  a = typeof x;
  $(a, x);
}
`````

## Output

`````js filename=intro
{
  let x = 1;
  let a = { a: 999, b: 1000 };
  a = typeof x;
  $(a, x);
}
`````

## Result

Should call `$` with:
 - 1: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same