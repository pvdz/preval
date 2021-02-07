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
  tmpCalleeParam = tmpDeleteOpt.x;
  true;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
tmpCalleeParam_1 = null.x;
tmpCallCallee(tmpCalleeParam_1);
`````

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Normalized calls: BAD?!
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Final output calls: BAD!!
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')
