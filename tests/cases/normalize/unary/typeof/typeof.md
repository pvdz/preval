# Preval test case

# typeof.md

> Normalize > Unary > Typeof > Typeof
>
> Typeof always returns a string

#TODO

## Input

`````js filename=intro
$(typeof typeof $(100));
`````

## Pre Normal

`````js filename=intro
$(typeof typeof $(100));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
$(100);
const tmpCalleeParam = 'string';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(100);
$('string');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'string'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
