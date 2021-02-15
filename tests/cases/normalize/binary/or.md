# Preval test case

# or.md

> normalize > binary > or
>
> Baseline binary expressions to cover ops

#TODO

## Input

`````js filename=intro
$(5 | 3);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 7;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(7);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 7
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same