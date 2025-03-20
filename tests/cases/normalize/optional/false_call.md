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
false();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`false()\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
false();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`false()\``;
`````


## PST Settled
With rename=true

`````js filename=intro
false.undefined();
throw "[Preval]: Call expression with illegal callee must crash before this line ; `false()`";
`````


## Todos triggered


- maybe support this call case too


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
