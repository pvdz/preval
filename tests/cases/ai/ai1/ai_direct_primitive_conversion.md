# Preval test case

# ai_direct_primitive_conversion.md

> Ai > Ai1 > Ai direct primitive conversion
>
> Test: Simplification of String(literal_string) and Number(literal_number).

## Input

`````js filename=intro
// Expected: let s = "hello"; $("string", s); let n = 42; $("number", n);
let s = String("hello");
$("string", s);

let n = Number(42);
$("number", n);
`````


## Settled


`````js filename=intro
$(`string`, `hello`);
$(`number`, 42);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`string`, `hello`);
$(`number`, 42);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "string", "hello" );
$( "number", 42 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let s = `hello`;
$(`string`, s);
let n = 42;
$(`number`, n);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'string', 'hello'
 - 2: 'number', 42
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
