# Preval test case

# gtgtgt.md

> normalize > binary > gtgtgt
>
> Baseline binary expressions to cover ops

#TODO

## Input

`````js filename=intro
$(5 >>> 3);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 0;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(0);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
