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
throw `[Preval] Attempting to call a value that cannot be called: \`const tmpCalleeParam = \$dotCall(\`fail\`, o, \`oops\`);\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `[Preval] Attempting to call a value that cannot be called: \`const tmpCalleeParam = \$dotCall(\`fail\`, o, \`oops\`);\``;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "[Preval] Attempting to call a value that cannot be called: `const tmpCalleeParam = $dotCall(`fail`, o, `oops`);`";
`````


## Todos triggered


- (todo) first arg to $dotcall should be a reference to a function: TemplateLiteral


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
