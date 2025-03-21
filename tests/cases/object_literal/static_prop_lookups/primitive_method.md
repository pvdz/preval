# Preval test case

# primitive_method.md

> Object literal > Static prop lookups > Primitive method
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const o = {oops: 'fail'};
$(o.oops());
`````


## Settled


`````js filename=intro
`fail`();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`\`fail\`()\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
`fail`();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`\`fail\`()\``;
`````


## PST Settled
With rename=true

`````js filename=intro
"fail".undefined();
throw "[Preval]: Call expression with illegal callee must crash before this line ; ``fail`()`";
`````


## Todos triggered


- (todo) maybe support this call case too


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
