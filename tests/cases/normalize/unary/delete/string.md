# Preval test case

# string.md

> Normalize > Unary > Delete > String
>
> Silly case that we hopefully never see but :shrug:

#TODO

## Input

`````js filename=intro
$(delete "foo");
`````

## Pre Normal

`````js filename=intro
$(delete `foo`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = true;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(true);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
