# Preval test case

# same_objs.md

> eq > same_objs
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

#TODO

## Input

`````js filename=intro
const x = {};
$(x == x);
`````

## Normalized

`````js filename=intro
const x = {};
const tmpCallCallee = $;
const tmpCalleeParam = x == x;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
