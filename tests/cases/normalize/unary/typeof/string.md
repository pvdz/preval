# Preval test case

# string.md

> normalize > unary > typeof > string
>
> Typeof always returns a string

#TODO

## Input

`````js filename=intro
$(typeof "foo");
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 'string';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('string');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'string'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
