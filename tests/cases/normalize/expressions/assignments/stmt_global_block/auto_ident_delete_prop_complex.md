# Preval test case

# auto_ident_delete_prop_complex.md

> normalize > expressions > assignments > stmt_global_block > auto_ident_delete_prop_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let x = { y: 1 };

  let a = { a: 999, b: 1000 };
  a = delete $(x).y;
  $(a, x);
}
`````

## Normalized

`````js filename=intro
{
  let x = { y: 1 };
  let a = { a: 999, b: 1000 };
  const tmpDeleteObj = $(x);
  a = delete tmpDeleteObj.y;
  $(a, x);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
