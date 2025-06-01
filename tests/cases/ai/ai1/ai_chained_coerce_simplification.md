# Preval test case

# ai_chained_coerce_simplification.md

> Ai > Ai1 > Ai chained coerce simplification
>
> Test: Simplification of chained $coerce calls.

## Input

`````js filename=intro
// Expected (num to str): let val = $coerce($("input", 123), "string"); $("result", val);
// Expected (str to plustr): let val = $coerce($("input", "foo"), "plustr"); $("result", val);
let val1_in = $("input1", 123);
let val1_inter = $coerce(val1_in, "number");
let val1_final = $coerce(val1_inter, "string");
$("result1", val1_final);

let val2_in = $("input2", "foo");
let val2_inter = $coerce(val2_in, "string");
let val2_final = $coerce(val2_inter, "plustr");
$("result2", val2_final);
`````


## Settled


`````js filename=intro
const val1_in /*:unknown*/ = $(`input1`, 123);
const val1_inter /*:number*/ = $coerce(val1_in, `number`);
const val1_final /*:string*/ = $coerce(val1_inter, `string`);
$(`result1`, val1_final);
const val2_in /*:unknown*/ = $(`input2`, `foo`);
const val2_final /*:string*/ = $coerce(val2_in, `string`);
$(`result2`, val2_final);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`result1`, $coerce($coerce($(`input1`, 123), `number`), `string`));
$(`result2`, $coerce($(`input2`, `foo`), `string`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "input1", 123 );
const b = $coerce( a, "number" );
const c = $coerce( b, "string" );
$( "result1", c );
const d = $( "input2", "foo" );
const e = $coerce( d, "string" );
$( "result2", e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let val1_in = $(`input1`, 123);
let val1_inter = $coerce(val1_in, `number`);
let val1_final = $coerce(val1_inter, `string`);
$(`result1`, val1_final);
let val2_in = $(`input2`, `foo`);
let val2_inter = $coerce(val2_in, `string`);
let val2_final = $coerce(val2_inter, `plustr`);
$(`result2`, val2_final);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'input1', 123
 - 2: 'result1', 'NaN'
 - 3: 'input2', 'foo'
 - 4: 'result2', 'input2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
