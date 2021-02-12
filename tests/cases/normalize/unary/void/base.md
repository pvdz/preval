# Preval test case

# base.md

> normalize > void > base
>
> Void is really just undefined

#TODO

## Input

`````js filename=intro
$(void 5);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = undefined;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = undefined;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
