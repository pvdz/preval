# Preval test case

# export_default_func_anon.md

> normalize > hoisting > export_default_func_anon
>
> This should not be hoisted because you can't refer to it anyways

#TODO

## Input

`````js filename=intro
$(f);
export default function(){}
$(f);
`````

## Normalized

`````js filename=intro
$(f);
export default function () {}
$(f);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
