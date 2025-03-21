# Preval test case

# no_context_method_self.md

> Object literal > Inlining > No context method self
>
> This is a generalization of a pattern found in an (obfuscated) encode decode script. Object does not escape, calls methods that use `this`.

## Input

`````js filename=intro
const obj = {
  encode: function(){ $('method:', obj.str); },
  str: 'abc',
};
$('objstr:', obj.str);
$('objencode:', obj.encode());
`````


## Settled


`````js filename=intro
$(`objstr:`, `abc`);
$(`method:`, `abc`);
$(`objencode:`, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`objstr:`, `abc`);
$(`method:`, `abc`);
$(`objencode:`, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "objstr:", "abc" );
$( "method:", "abc" );
$( "objencode:", undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'objstr:', 'abc'
 - 2: 'method:', 'abc'
 - 3: 'objencode:', undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
