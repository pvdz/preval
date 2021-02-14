# Preval test case

# auto_ident_upd_mi_complex.md

> normalize > expressions > statement > arr_element > auto_ident_upd_mi_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
--$($(b)).x + --$($(b)).x;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(b);
const tmpAssignMemLhsObj = tmpCallCallee(tmpCalleeParam);
const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = tmpCompoundAssignLhs - 1;
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(b);
const tmpAssignMemLhsObj$2 = tmpCallCallee$1(tmpCalleeParam$1);
const tmpCompoundAssignLhs$1 = tmpAssignMemLhsObj$2.x;
const tmpAssignMemLhsObj$3 = tmpAssignMemLhsObj$2;
const tmpAssignMemRhs$1 = tmpCompoundAssignLhs$1 - 1;
tmpAssignMemLhsObj$3.x = tmpAssignMemRhs$1;
$(a, b);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(b);
const tmpAssignMemLhsObj = $(tmpCalleeParam);
const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
const tmpAssignMemRhs = tmpCompoundAssignLhs - 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
const tmpCalleeParam$1 = $(b);
const tmpAssignMemLhsObj$2 = $(tmpCalleeParam$1);
const tmpCompoundAssignLhs$1 = tmpAssignMemLhsObj$2.x;
const tmpAssignMemRhs$1 = tmpCompoundAssignLhs$1 - 1;
tmpAssignMemLhsObj$2.x = tmpAssignMemRhs$1;
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { x: '0' }
 - 4: { x: '0' }
 - 5: { a: '999', b: '1000' }, { x: '-1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
