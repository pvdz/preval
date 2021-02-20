# Preval test case

# and.md

> Normalize > Binary > And
>
> Baseline binary expressions to cover ops

#TODO

## Input

`````js filename=intro
$(5 & 3);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 1;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
