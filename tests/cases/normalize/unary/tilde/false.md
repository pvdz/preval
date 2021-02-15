# Preval test case

# false.md

> normalize > unary > minus > false
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(~false);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = -1;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(-1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same