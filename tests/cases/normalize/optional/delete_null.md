# Preval test case

# delete_null.md

> normalize > optional > delete_null
>
> Delete on member expression is special casing. Works with optional chaining.

#TODO

## Input

`````js filename=intro
$(delete null?.x);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpDeleteOpt = null;
if (tmpDeleteOpt) {
  let tmpCalleeParam = true;
} else {
  tmpCalleeParam = delete tmpDeleteOpt.x;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Normalized calls: BAD?!
 - eval returned: ('<crash[ Cannot convert undefined or null to object ]>')

Final output calls: BAD!!
 - eval returned: undefined
