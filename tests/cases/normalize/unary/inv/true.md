# Preval test case

# true.md

> normalize > unary > inv > true
>
> Inverting literals should be statically resolved

#TODO

## Input

`````js filename=intro
$(!true);
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

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
