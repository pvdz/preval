# Preval test case

# one.md

> Normalize > Unary > Tilde > One
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(~1);
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
