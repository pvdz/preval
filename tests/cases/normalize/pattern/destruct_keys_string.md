# Preval test case

# destruct_keys_string.md

> Normalize > Pattern > Destruct keys string

## Input

`````js filename=intro
const x = {"a b": 3};
let {
  "a b": c, // this means `var c = x["a b"]`
} = x;
$(c);
`````


## Settled


`````js filename=intro
const tmpBindingPatternObjRoot /*:object*/ /*truthy*/ = { [`a b`]: 3 };
const c /*:unknown*/ = tmpBindingPatternObjRoot[`a b`];
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [`a b`]: 3 }[`a b`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ "a b" ]: 3 };
const b = a[ "a b" ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = { [`a b`]: 3 };
let tmpBindingPatternObjRoot = x;
let tmpCK = `a b`;
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
