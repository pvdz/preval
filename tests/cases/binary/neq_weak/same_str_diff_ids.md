# Preval test case

# same_str_diff_ids.md

> Binary > Neq weak > Same str diff ids
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
const x = 'xyz';
const y = x;
$(x != y);
`````

## Pre Normal

`````js filename=intro
const x = `xyz`;
const y = x;
$(x != y);
`````

## Normalized

`````js filename=intro
const x = `xyz`;
const y = x;
const tmpCallCallee = $;
const tmpCalleeParam = x != y;
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
