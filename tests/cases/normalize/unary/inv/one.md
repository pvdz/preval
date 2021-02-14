# Preval test case

# one.md

> normalize > unary > inv > one
>
> Inverting literals should be statically resolved

#TODO

## Input

`````js filename=intro
$(!1);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = false;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(false);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
