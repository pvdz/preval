# Preval test case

# minus_one.md

> normalize > unary > minus > minus_one
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(~(-1));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = ~-1;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ~-1;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same