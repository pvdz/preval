# Preval test case

# false_call.md

> Normalize > Optional > False call
>
> Empty string should make `?.` to return undefined. This should throw, not return undefined.

## Input

`````js filename=intro
$(false?.());
`````


## Settled


`````js filename=intro
throw `[Preval] Attempting to call a value that cannot be called: \`const tmpChainElementCall = false();\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `[Preval] Attempting to call a value that cannot be called: \`const tmpChainElementCall = false();\``;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "[Preval] Attempting to call a value that cannot be called: `const tmpChainElementCall = false();`";
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
