# Preval test case

# neg_zero_false.md

> Binary > Neq strong > Neg zero false
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

Note: weak and strict equals can not detect negative zero this way.

## Input

`````js filename=intro
$(-0 !== 0);
`````

## Pre Normal

`````js filename=intro
$(-0 !== 0);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = -0 !== 0;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = -0 !== 0;
$(tmpCalleeParam);
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
