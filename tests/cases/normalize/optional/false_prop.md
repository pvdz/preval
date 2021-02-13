# Preval test case

# false_prop.md

> normalize > optional > false_prop
>
> Empty string should make `?.` to return undefined.

#TODO

## Input

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
let tmpCalleeParam = undefined;
const tmpIfTest = false != null;
if (tmpIfTest) {
  const tmpChainElementObject = false.toString;
  const tmpChainElementCall = tmpChainElementObject.call(false);
  tmpCalleeParam = tmpChainElementCall;
}
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'false'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
