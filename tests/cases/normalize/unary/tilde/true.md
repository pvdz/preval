# Preval test case

# true.md

> Normalize > Unary > Tilde > True
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(~true);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = -2;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(-2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
