# Preval test case

# lt.md

> normalize > binary > lt
>
> Baseline binary expressions to cover ops

#TODO

## Input

`````js filename=intro
$(5 < 3);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = false;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(false);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
