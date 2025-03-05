# Preval test case

# empty_string_call.md

> Normalize > Optional > Empty string call
>
> Empty string should make `?.` to return undefined. This should throw, not return undefined.

## Input

`````js filename=intro
$(''?.());
`````

## Pre Normal


`````js filename=intro
$(``?.());
`````

## Normalized


`````js filename=intro
let tmpCalleeParam = undefined;
const tmpChainRootCall = ``;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall();
  tmpCalleeParam = tmpChainElementCall;
} else {
}
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
``();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`\`\`()\``;
`````

## PST Output

With rename=true

`````js filename=intro
"".undefined();
throw "[Preval]: Call expression with illegal callee must crash before this line ; ```()`";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
