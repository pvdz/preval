# Preval test case

# delete.md

> normalize > unary > typeof > delete
>
> Typeof always returns a string

#TODO

## Input

`````js filename=intro
$(typeof delete $(100).x);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpDeleteObj = $(100);
delete tmpDeleteObj.x;
const tmpCalleeParam = 'boolean';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpDeleteObj = $(100);
delete tmpDeleteObj.x;
$('boolean');
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 'boolean'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
