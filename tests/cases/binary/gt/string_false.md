# Preval test case

# string_false.md

> eq > string_false
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
$('x' > 'y');
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 'x' > 'y';
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
