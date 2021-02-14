# Preval test case

# null.md

> normalize > unary > typeof > null
>
> Typeof always returns a string

#TODO

## Input

`````js filename=intro
$(typeof null);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 'object';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('object');
`````

## Result

Should call `$` with:
 - 1: 'object'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
