# Preval test case

# false_call.md

> normalize > optional > false_call
>
> Empty string should make `?.` to return undefined. This should throw, not return undefined.

#TODO

## Input

`````js filename=intro
$(null?.());
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = null;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall();
  tmpCalleeParam = tmpChainElementCall;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpIfTest = null != null;
if (tmpIfTest) {
  const tmpChainElementCall = null();
  tmpCalleeParam = tmpChainElementCall;
}
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
