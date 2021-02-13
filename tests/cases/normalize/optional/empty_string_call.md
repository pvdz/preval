# Preval test case

# empty_string_call.md

> normalize > optional > empty_string_call
>
> Empty string should make `?.` to return undefined. This should throw, not return undefined.

#TODO

## Input

`````js filename=intro
$(''?.());
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = '';
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
const tmpIfTest = '' != null;
if (tmpIfTest) {
  const tmpChainElementCall = ''();
  tmpCalleeParam = tmpChainElementCall;
}
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
