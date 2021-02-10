# Preval test case

# auto_ident_array_simple.md

> normalize > expressions > assignments > stmt_global_block > auto_ident_array_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = [1, 2, 3];
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = [1, 2, 3];
  $(a);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
