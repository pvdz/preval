# Preval test case

# nan.md

> Normalize > Unary > Inv > Nan
>
> Inverting literals should be statically resolved

#TODO

## Input

`````js filename=intro
$(!NaN);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = true;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(true);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
