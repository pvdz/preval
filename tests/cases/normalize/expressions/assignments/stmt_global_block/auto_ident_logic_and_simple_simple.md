# Preval test case

# auto_ident_logic_and_simple_simple.md

> normalize > expressions > assignments > stmt_global_block > auto_ident_logic_and_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = 1 && 2;
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = 1;
  if (a) {
    a = 2;
  }
  $(a);
}
`````

## Output

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = 1;
  if (a) {
    a = 2;
  }
  $(a);
}
`````

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same