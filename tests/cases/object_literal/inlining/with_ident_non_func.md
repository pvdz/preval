# Preval test case

# with_ident_non_func.md

> Object literal > Inlining > With ident non func
>
>

## Input

`````js filename=intro
let g = function(){ 
  return 'wat';
}
const obj = {f: g};
$(obj.f());
const tmp = function(){ g = 1; };
$(tmp());
$(obj.f());
`````


## Settled


`````js filename=intro
$(`wat`);
$(undefined);
$(`wat`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`wat`);
$(undefined);
$(`wat`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "wat" );
$( undefined );
$( "wat" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'wat'
 - 2: undefined
 - 3: 'wat'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
