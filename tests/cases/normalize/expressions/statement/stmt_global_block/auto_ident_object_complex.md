# Preval test case

# auto_ident_object_complex.md

> normalize > expressions > statement > stmt_global_block > auto_ident_object_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  ({ x: $(1), y: 2, z: $(3) });
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  $(1);
  $(3);
  $(a);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
