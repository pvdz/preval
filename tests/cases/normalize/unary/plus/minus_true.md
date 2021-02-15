# Preval test case

# minus_true.md

> normalize > unary > minus > minus_true
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(+(-true));
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