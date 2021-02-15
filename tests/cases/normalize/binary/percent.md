# Preval test case

# percent.md

> normalize > binary > percent
>
> Baseline binary expressions to cover ops

#TODO

## Input

`````js filename=intro
$(5 % 3);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 2;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
