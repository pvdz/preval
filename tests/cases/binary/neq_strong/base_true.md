# Preval test case

# base_true.md

> eq > base_true
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
$(1 !== 1);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 1 !== 1;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
tmpCallCallee(false);
`````

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
