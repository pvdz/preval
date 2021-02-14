# Preval test case

# false.md

> normalize > unary > typeof > false
>
> Typeof always returns a string

#TODO

## Input

`````js filename=intro
$(typeof false);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 'boolean';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('boolean');
`````

## Result

Should call `$` with:
 - 1: 'boolean'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
