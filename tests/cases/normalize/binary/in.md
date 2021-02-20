# Preval test case

# in.md

> Normalize > Binary > In
>
> Baseline binary expressions to cover ops

#TODO

## Input

`````js filename=intro
$(5 in Infinity);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 5 in Infinity;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = 5 in Infinity;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '5' in Infinity ]>")

Normalized calls: Same

Final output calls: Same
