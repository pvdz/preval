# Preval test case

# null.md

> normalize > unary > inv > null
>
> Inverting literals should be statically resolved

#TODO

## Input

`````js filename=intro
$(!null);
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

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
