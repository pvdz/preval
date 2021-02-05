# Preval test case

# num_str.md

> eq > num_str
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
$(1 !== 'x');
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 1 !== 'x';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
tmpCallCallee(true);
`````

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
