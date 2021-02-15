# Preval test case

# inveqeq.md

> normalize > binary > inveqeq
>
> Baseline binary expressions to cover ops

#TODO

## Input

`````js filename=intro
$(5 !== 3);
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

Normalized calls: Same

Final output calls: Same
