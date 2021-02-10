# Preval test case

# _base_prop_undef.md

> normalize > optional > _base_prop_undef
>
> Simple example

#TODO

## Input

`````js filename=intro
var f = undefined;
$(f?.x);
`````

## Normalized

`````js filename=intro
var f;
f = undefined;
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = f;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpCalleeParam = tmpChainElementObject;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
