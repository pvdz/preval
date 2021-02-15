# Preval test case

# starstar.md

> normalize > binary > starstar
>
> Baseline binary expressions to cover ops

#TODO

## Input

`````js filename=intro
$(5 ** 3);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 125;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(125);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 125
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
