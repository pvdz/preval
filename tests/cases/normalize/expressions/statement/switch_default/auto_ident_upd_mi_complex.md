# Preval test case

# auto_ident_upd_mi_complex.md

> normalize > expressions > statement > switch_default > auto_ident_upd_mi_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    --$($(b)).x;
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(b);
    const tmpAssignMemLhsObj = tmpCallCallee(tmpCalleeParam);
    const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpCompoundAssignLhs - 1;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(b);
    const tmpAssignMemLhsObj = tmpCallCallee(tmpCalleeParam);
    const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpCompoundAssignLhs - 1;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: { a: '999', b: '1000' }, { x: '0' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
