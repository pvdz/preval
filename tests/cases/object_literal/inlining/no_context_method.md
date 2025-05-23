# Preval test case

# no_context_method.md

> Object literal > Inlining > No context method
>
> This is a generalization of a pattern found in an (obfuscated) encode decode script. Object does not escape, calls methods that use `this`.

## Input

`````js filename=intro
const obj = {
  encode: function(){ $(abc); },
};
const str = 'abc'
$(obj.encode());
`````


## Settled


`````js filename=intro
$(abc);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(abc);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( abc );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = function () {
  debugger;
  $(abc);
  return undefined;
};
const obj = { encode: tmpObjLitVal };
const str = `abc`;
const tmpMCF = obj.encode;
let tmpCalleeParam = $dotCall(tmpMCF, obj, `encode`);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

abc


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
