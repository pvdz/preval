# Preval test case

# eq_obj_null_lit.md

> Type tracked > Eqeqeq > Eq obj null lit
>
> If we know the type of a value without knowing the actual value, we can still resolve `===`

#TODO

## Input

`````js filename=intro
const x = {a: 1};
$(x === null); // Must be false
`````

## Pre Normal

`````js filename=intro
const x = { a: 1 };
$(x === null);
`````

## Normalized

`````js filename=intro
const x = { a: 1 };
const tmpCallCallee = $;
const tmpCalleeParam = x === null;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(false);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
