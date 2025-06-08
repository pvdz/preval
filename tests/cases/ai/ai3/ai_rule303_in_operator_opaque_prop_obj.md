# Preval test case

# ai_rule303_in_operator_opaque_prop_obj.md

> Ai > Ai3 > Ai rule303 in operator opaque prop obj
>
> Test: in operator with an opaque property name and an opaque object.

## Input

`````js filename=intro
// Expected: P in obj; (or equivalent, operation preserved)
let obj = $('obj', { a: 1 });
let P = $('P', "a");
let result = $('result', P in obj);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { a: 1 };
const obj /*:unknown*/ = $(`obj`, tmpCalleeParam);
const P /*:unknown*/ = $(`P`, `a`);
const tmpCalleeParam$1 /*:boolean*/ = P in obj;
$(`result`, tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $(`obj`, { a: 1 });
$(`result`, $(`P`, `a`) in obj);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { a: 1 };
const b = $( "obj", a );
const c = $( "P", "a" );
const d = c in b;
$( "result", d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { a: 1 };
let obj = $(`obj`, tmpCalleeParam);
let P = $(`P`, `a`);
let tmpCalleeParam$1 = P in obj;
let result = $(`result`, tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'obj', { a: '1' }
 - 2: 'P', 'a'
 - eval returned: ("<crash[ Cannot use 'in' operator to search for 'P' in obj ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
