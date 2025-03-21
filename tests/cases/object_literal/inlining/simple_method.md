# Preval test case

# simple_method.md

> Object literal > Inlining > Simple method
>
> This is a generalization of a pattern found in an (obfuscated) encode decode script. Object does not escape, calls methods that use `this`.

## Input

`````js filename=intro
const obj = {
  encode: function(){ $('inline me'); },
};
$(obj.encode());
`````


## Settled


`````js filename=intro
$(`inline me`);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`inline me`);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "inline me" );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'inline me'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
