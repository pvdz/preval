# Preval test case

# minus_one.md

> normalize > unary > inv > minus_one
>
> Inverting literals should be statically resolved

#TODO

## Input

`````js filename=intro
$(!-1);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = !-1;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = !-1;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same