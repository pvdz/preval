# Preval test case

# false_call.md

> Normalize > Optional > False call
>
> Empty string should make `?.` to return undefined. This should throw, not return undefined.

#TODO

## Input

`````js filename=intro
$(false?.());
`````

## Pre Normal

`````js filename=intro
$(false?.());
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = false;
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
false();
throw `[Preval]: Call expression with illegal callee must crash before this line `;
`````

## PST Output

With rename=true

`````js filename=intro
false.undefined();
throw "[Preval]: Call expression with illegal callee must crash before this line ";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
