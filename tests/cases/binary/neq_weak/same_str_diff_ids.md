# Preval test case

# diff_objs_diff_ids.md

> eq > diff_objs_diff_ids
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
const x = 'xyz';
const y = x;
$(x != y);
`````

## Normalized

`````js filename=intro
const x = 'xyz';
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

Normalized calls: Same

Final output calls: Same
