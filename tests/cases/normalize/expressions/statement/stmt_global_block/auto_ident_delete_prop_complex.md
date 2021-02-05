# Preval test case

# auto_ident_delete_prop_complex.md

> normalize > expressions > statement > stmt_global_block > auto_ident_delete_prop_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
{
  let x = { y: 1 };

  let a = { a: 999, b: 1000 };
  delete $(x).y;
  $(a, x);
}
`````

## Normalized

`````js filename=intro
{
  let x = { y: 1 };
  let a = { a: 999, b: 1000 };
  const tmpDeleteObj = $(x);
  delete tmpDeleteObj.y;
  $(a, x);
}
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteObj = $(x);
delete tmpDeleteObj.y;
$(a, x);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
