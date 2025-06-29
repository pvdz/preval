# Preval test case

# ai_rule372_chained_assign_increment2.md

> Ai > Ai3 > Ai rule372 chained assign increment2
>
> Rule 372: Chained assignment with prefix increment

## Input

`````js filename=intro
let a = { prop: 0 };
const tmpObjLitVal = $('some value');
let c = { val: tmpObjLitVal };
a.prop = tmpObjLitVal;
let tmpCalleeParam = a.prop;
$(`final_a_prop`, tmpCalleeParam);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(`some value`);
$(`final_a_prop`, tmpObjLitVal);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`final_a_prop`, $(`some value`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "some value" );
$( "final_a_prop", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { prop: 0 };
const tmpObjLitVal = $(`some value`);
let c = { val: tmpObjLitVal };
a.prop = tmpObjLitVal;
let tmpCalleeParam = a.prop;
$(`final_a_prop`, tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'some value'
 - 2: 'final_a_prop', 'some value'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
