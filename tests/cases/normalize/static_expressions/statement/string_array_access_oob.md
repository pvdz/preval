# Preval test case

# string_array_access_oob.md

> Normalize > Static expressions > Statement > String array access oob
>
> The length property on a string literal can be determined at compile time

#TODO

## Input

`````js filename=intro
$("fop"[5]);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = undefined;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same