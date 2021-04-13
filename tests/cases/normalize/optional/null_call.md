# Preval test case

# null_call.md

> Normalize > Optional > Null call
>
> Empty string should make `?.` to return undefined. This should throw, not return undefined.

#TODO

## Input

`````js filename=intro
$(null?.());
`````

## Pre Normal

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
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
