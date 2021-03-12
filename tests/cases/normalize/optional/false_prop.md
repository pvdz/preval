# Preval test case

# false_prop.md

> Normalize > Optional > False prop
>
> Empty string should make `?.` to return undefined.

#TODO

## Input

`````js filename=intro
$(false?.toString());
`````

## Pre Normal

`````js filename=intro
$(false?.toString());
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = false;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.toString;
  const tmpChainElementCall = tmpChainElementObject.call(tmpChainRootProp);
  tmpCalleeParam = tmpChainElementCall;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpChainElementObject = false.toString;
const tmpChainElementCall = tmpChainElementObject.call(false);
$(tmpChainElementCall);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'false'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
