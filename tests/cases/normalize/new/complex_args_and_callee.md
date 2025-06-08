# Preval test case

# complex_args_and_callee.md

> Normalize > New > Complex args and callee
>
> The `new` operator should apply to a single identifier. A literal can also work though it would lead to a runtime error.

## Input

`````js filename=intro
$(new ($())(5 + 5, $(), Array.prototype.length));
`````


## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $();
const tmpCalleeParam$3 /*:unknown*/ = $();
const tmpCalleeParam /*:object*/ /*truthy*/ = new tmpNewCallee(10, tmpCalleeParam$3, 0);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $();
const tmpCalleeParam$3 = $();
$(new tmpNewCallee(10, tmpCalleeParam$3, 0));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = $();
const c = new a( 10, b, 0 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpNewCallee = $();
let tmpCalleeParam$1 = 10;
let tmpCalleeParam$3 = $();
const tmpCompObj = $Array_prototype;
let tmpCalleeParam$5 = tmpCompObj.length;
let tmpCalleeParam = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 
 - eval returned: ('<crash[ <ref> is not a constructor ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
