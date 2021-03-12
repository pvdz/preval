# Preval test case

# empty_string_prop.md

> Normalize > Optional > Empty string prop
>
> Empty string should make `?.` to return undefined.

#TODO

## Input

`````js filename=intro
$(''?.length);
`````

## Pre Normal

`````js filename=intro
$(''?.length);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = '';
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.length;
  tmpCalleeParam = tmpChainElementObject;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(0);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
