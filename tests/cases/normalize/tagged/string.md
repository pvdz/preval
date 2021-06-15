# Preval test case

# string.md

> Normalize > Tagged > String
>
> A tagged template that is just a string

#TODO

## Input

`````js filename=intro
$`foo`;
`````

## Pre Normal

`````js filename=intro
$([`foo`]);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [`foo`];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [`foo`];
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['foo']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
