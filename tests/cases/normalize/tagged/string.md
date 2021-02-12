# Preval test case

# string.md

> normalize > templates > string
>
> A tagged template that is just a string

#TODO

## Input

`````js filename=intro
$`foo`;
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = ['foo'];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ['foo'];
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: ['foo']
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
