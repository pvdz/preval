# Preval test case

# false_prop.md

> normalize > optional > false_prop
>
> Empty string should make `?.` to return undefined.

#TODO

## Input

`````js filename=intro
$(null?.toString());
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = null;
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
let tmpCalleeParam = undefined;
const tmpIfTest = null != null;
if (tmpIfTest) {
  const tmpChainElementObject = null.toString;
  const tmpChainElementCall = tmpChainElementObject.call(null);
  tmpCalleeParam = tmpChainElementCall;
}
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
