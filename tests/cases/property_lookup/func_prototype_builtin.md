# Preval test case

# func_prototype_builtin.md

> Property lookup > Func prototype builtin
>
> Getting the prototype from a known function, whatever it is, should yield `Function.prototype`

## Input

`````js filename=intro
const x = [].flatMap;
const f = x.prototype;
$(f);
`````


## Settled


`````js filename=intro
const f /*:unknown*/ = $array_flatMap.prototype;
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($array_flatMap.prototype);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $array_flatMap.prototype;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = [];
const x = tmpCompObj.flatMap;
const f = x.prototype;
$(f);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
