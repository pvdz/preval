# Preval test case

# auto_ident_prop_complex.md

> normalize > expressions > assignments > stmt_global_block > auto_ident_prop_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { c: 1 };

  let a = { a: 999, b: 1000 };
  a = $(b).c;
  $(a, b);
}
`````

## Normalized

`````js filename=intro
{
  let b = { c: 1 };
  let a = { a: 999, b: 1000 };
  const tmpAssignRhsProp = $(b);
  a = tmpAssignRhsProp.c;
  $(a, b);
}
`````

## Output

`````js filename=intro
{
  let b = { c: 1 };
  let a = { a: 999, b: 1000 };
  const tmpAssignRhsProp = $(b);
  a = tmpAssignRhsProp.c;
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
