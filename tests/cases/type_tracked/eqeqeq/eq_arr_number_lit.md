# Preval test case

# eq_arr_number_lit.md

> Type tracked > Eqeqeq > Eq arr number lit
>
> If we know the type of a value without knowing the actual value, we can still resolve `===`

#TODO

## Input

`````js filename=intro
const x = [1, 2, 3];
$(x === 2); // Must be false
`````

## Pre Normal

`````js filename=intro
const x = [1, 2, 3];
$(x === 2);
`````

## Normalized

`````js filename=intro
const x = [1, 2, 3];
const tmpCallCallee = $;
const tmpCalleeParam = x === 2;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(false);
`````

## PST Output

With rename=true

`````js filename=intro
$( false );
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
