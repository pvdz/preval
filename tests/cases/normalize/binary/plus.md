# Preval test case

# plus.md

> normalize > binary > plus
>
> Baseline binary expressions to cover ops

#TODO

## Input

`````js filename=intro
$(1 + null);
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
