# Preval test case

# string_false.md

> eq > string_false
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
$('2' > '1');
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = '2' > '1';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = '2' > '1';
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
