# Preval test case

# empty_string_call.md

> Normalize > Optional > Empty string call
>
> Empty string should make `?.` to return undefined. This should throw, not return undefined.

## Input

`````js filename=intro
$(''?.());
`````


## Settled


`````js filename=intro
throw `[Preval] Attempting to call a value that cannot be called: \`const tmpChainElementCall = \`\`();\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `[Preval] Attempting to call a value that cannot be called: \`const tmpChainElementCall = \`\`();\``;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "[Preval] Attempting to call a value that cannot be called: `const tmpChainElementCall = ``();`";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpChainRootCall = ``;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall();
  tmpCalleeParam = tmpChainElementCall;
  $(tmpChainElementCall);
} else {
  $(tmpCalleeParam);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
