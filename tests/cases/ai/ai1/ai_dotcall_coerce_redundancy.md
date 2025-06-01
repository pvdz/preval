# Preval test case

# ai_dotcall_coerce_redundancy.md

> Ai > Ai1 > Ai dotcall coerce redundancy
>
> Test: Redundant $coerce after $dotCall to a type-preserving builtin.

## Input

`````js filename=intro
// Expected: let temp = $dotCall($Math_floor, null, "floor", $("input_num", 1.23)); $("result", temp);
let temp = $dotCall($Math_floor, null, "floor", $("input_num", 1.23));
let final = $coerce(temp, "number"); // This $coerce should be redundant
$("result", final);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`input_num`, 1.23);
const final /*:number*/ = $Math_floor(tmpCalleeParam);
$(`result`, final);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`result`, $Math_floor($(`input_num`, 1.23)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "input_num", 1.23 );
const b = $Math_floor( a );
$( "result", b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $(`input_num`, 1.23);
let temp = $Math_floor(tmpCalleeParam);
let final = $coerce(temp, `number`);
$(`result`, final);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_floor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'input_num', 1.23
 - 2: 'result', NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
