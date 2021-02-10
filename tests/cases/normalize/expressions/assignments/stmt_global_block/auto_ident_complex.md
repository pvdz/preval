# Preval test case

# auto_ident_complex.md

> normalize > expressions > assignments > stmt_global_block > auto_ident_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = 1;

  let a = { a: 999, b: 1000 };
  a = $(b);
  $(a, b);
}
`````

## Normalized

`````js filename=intro
{
  let b = 1;
  let a = { a: 999, b: 1000 };
  a = $(b);
  $(a, b);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
