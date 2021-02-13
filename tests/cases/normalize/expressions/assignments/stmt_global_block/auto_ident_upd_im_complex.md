# Preval test case

# auto_ident_upd_im_complex.md

> normalize > expressions > assignments > stmt_global_block > auto_ident_upd_im_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { x: 1 };

  let a = { a: 999, b: 1000 };
  a = $($(b)).x--;
  $(a, b);
}
`````

## Normalized

`````js filename=intro
{
  let b = { x: 1 };
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpCalleeParam = $(b);
  const tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
  const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
  const tmpAssignMemLhsObj = tmpPostUpdArgObj;
  const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  a = tmpPostUpdArgVal;
  $(a, b);
}
`````

## Output

`````js filename=intro
{
  let b = { x: 1 };
  let a = { a: 999, b: 1000 };
  const tmpCalleeParam = $(b);
  const tmpPostUpdArgObj = $(tmpCalleeParam);
  const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
  const tmpAssignMemLhsObj = tmpPostUpdArgObj;
  const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  a = tmpPostUpdArgVal;
  $(a, b);
}
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 1, { x: '0' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same