# Preval test case

# string_with_parenthesized_expression.md

> String fusing > Ai > String with parenthesized expression
>
> Test string concatenation with parenthesized expressions

## Input

`````js filename=intro
const a = $("hello");
const b = $("world");
const result = "result: " + (a + b);
$(result);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(`hello`);
const b /*:unknown*/ = $(`world`);
const tmpBinBothRhs /*:primitive*/ = a + b;
const result /*:string*/ /*truthy*/ = `result: ${tmpBinBothRhs}`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(`hello`) + $(`world`);
$(`result: ${tmpBinBothRhs}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = $( "world" );
const c = a + b;
const d = `result: ${c}`;
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(`hello`);
const b = $(`world`);
const tmpBinBothLhs = `result: `;
const tmpBinBothRhs = a + b;
const result = tmpBinBothLhs + tmpBinBothRhs;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'world'
 - 3: 'result: helloworld'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
