# Preval test case

# infinity.md

> Normalize > Unary > Inv > Infinity
>
> Inverting literals should be statically resolved

#TODO

## Input

`````js filename=intro
$(!Infinity);
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
