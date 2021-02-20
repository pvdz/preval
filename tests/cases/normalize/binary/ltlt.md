# Preval test case

# ltlt.md

> Normalize > Binary > Ltlt
>
> Baseline binary expressions to cover ops

#TODO

## Input

`````js filename=intro
$(5 << 3);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 40;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(40);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 40
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
