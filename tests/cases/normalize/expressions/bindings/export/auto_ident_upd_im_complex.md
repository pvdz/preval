# Preval test case

# auto_ident_upd_im_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident upd im complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

export let a = $($(b)).x--;
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = $($(b)).x--;
export { a };
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
export { a };
$(a, b);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = $(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
const a = tmpPostUpdArgVal;
export { a };
$(tmpPostUpdArgVal, b);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
