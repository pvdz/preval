# Preval test case

# auto_ident_upd_ip_complex.md

> normalize > expressions > statement > stmt_global_block > auto_ident_upd_ip_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
{
  let b = { x: 1 };

  let a = { a: 999, b: 1000 };
  $($(b)).x++;
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
  const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  $(a, b);
}
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemLhsObj = tmpPostUpdArgObj;
const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { a: '999', b: '1000' }, { x: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
