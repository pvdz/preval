# Preval test case

# true.md

> normalize > unary > minus > true
>
> Negative literals should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(-true);
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
