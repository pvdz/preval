# Preval test case

# destruct_keys_num.md

> Normalize > Pattern > Destruct keys num

## Input

`````js filename=intro
const x = {200: 3};
let {
  200: c, // this means `var c = x[200]`
} = x;
$(c);
`````


## Settled


`````js filename=intro
const tmpBindingPatternObjRoot /*:object*/ /*truthy*/ = { [200]: 3 };
const c /*:unknown*/ = tmpBindingPatternObjRoot[200];
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [200]: 3 }[200]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ 200 ]: 3 };
const b = a[ 200 ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = { [200]: 3 };
let tmpBindingPatternObjRoot = x;
let tmpCK = 200;
let c = tmpBindingPatternObjRoot[tmpCK];
$(c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
