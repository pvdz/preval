# Preval test case

# eq_number_lit_obj.md

> Type tracked > Eqeqeq > Eq number lit obj
>
> If we know the type of a value without knowing the actual value, we can still resolve `===`

#TODO

## Input

`````js filename=intro
const x = {a: 1};
$(2 === x); // Must be false
`````

## Pre Normal

`````js filename=intro
const x = { a: 1 };
$(2 === x);
`````

## Normalized

`````js filename=intro
const x = { a: 1 };
const tmpCallCallee = $;
const tmpCalleeParam = 2 === x;
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
