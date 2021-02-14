# Preval test case

# number.md

> normalize > unary > typeof > number
>
> Typeof always returns a string

#TODO

## Input

`````js filename=intro
$(typeof 500);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 'number';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('number');
`````

## Result

Should call `$` with:
 - 1: 'number'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
