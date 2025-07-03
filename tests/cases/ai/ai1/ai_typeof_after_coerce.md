# Preval test case

# ai_typeof_after_coerce.md

> Ai > Ai1 > Ai typeof after coerce
>
> Test: typeof behavior on a variable that is $coerce'd.

## Input

`````js filename=intro
// Expected: let x_coerced = $coerce($("input_val"), "string"); $("type_is_string", "string");
let unknown_val = $("input_val"); // Value whose compile-time type might be unknown to Preval initially
let x_coerced = $coerce(unknown_val, "string");
let type_of_x = typeof x_coerced;
$("type_is_string", type_of_x);
`````


## Settled


`````js filename=intro
const unknown_val /*:unknown*/ = $(`input_val`);
$coerce(unknown_val, `string`);
$(`type_is_string`, `string`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
String($(`input_val`));
$(`type_is_string`, `string`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "input_val" );
$coerce( a, "string" );
$( "type_is_string", "string" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let unknown_val = $(`input_val`);
let x_coerced = $coerce(unknown_val, `string`);
let type_of_x = typeof x_coerced;
$(`type_is_string`, type_of_x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'input_val'
 - 2: 'type_is_string', 'string'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
