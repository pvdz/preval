# Preval test case

# nan.md

> normalize > unary > typeof > nan
>
> Typeof always returns a string

#TODO

## Input

`````js filename=intro
$(typeof NaN);
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

## Globals

None

## Result

Should call `$` with:
 - 1: 'number'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
