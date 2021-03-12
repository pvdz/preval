# Preval test case

# base_false.md

> Binary > Gt eq > Base false
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
$(1 >= 2);
`````

## Pre Normal

`````js filename=intro
$(1 >= 2);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = false;
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
