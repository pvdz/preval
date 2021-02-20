# Preval test case

# diff_objs_diff_ids.md

> Binary > Neq weak > Diff objs diff ids
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

#TODO

## Input

`````js filename=intro
const x = {};
const y = x;
$(x != y);
`````

## Normalized

`````js filename=intro
const x = {};
const y = x;
const tmpCallCallee = $;
const tmpCalleeParam = x != y;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const x = {};
const tmpCalleeParam = x != x;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
