# Preval test case

# auto_ident_upd_im_complex.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_upd_im_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = $($(b)).x--;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
const tmpCallCallee = $;
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemLhsObj = tmpPostUpdArgObj;
const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
let a = tmpPostUpdArgVal;
$(a, b);
`````

## Output

`````js filename=intro
let b = { x: 1 };
const tmpCallCallee = $;
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemLhsObj = tmpPostUpdArgObj;
const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
let a = tmpPostUpdArgVal;
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 1, { x: '0' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
