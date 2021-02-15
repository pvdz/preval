# Preval test case

# false.md

> normalize > unary > inv > false
>
> Inverting literals should be statically resolved

#TODO

## Input

`````js filename=intro
$(!false);
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