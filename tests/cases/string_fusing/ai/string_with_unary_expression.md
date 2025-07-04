# Preval test case

# string_with_unary_expression.md

> String fusing > Ai > String with unary expression
>
> Test string concatenation with unary expressions

## Input

`````js filename=intro
const num = $("42");
const result = "number: " + (+num);
$(result);
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(`42`);
const tmpBinBothRhs /*:number*/ = +num;
const result /*:string*/ /*truthy*/ = `number: ${tmpBinBothRhs}`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num = $(`42`);
const tmpBinBothRhs = +num;
$(`number: ${tmpBinBothRhs}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "42" );
const b = +a;
const c = `number: ${b}`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(`42`);
const tmpBinBothLhs = `number: `;
const tmpBinBothRhs = +num;
const result = tmpBinBothLhs + tmpBinBothRhs;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '42'
 - 2: 'number: 42'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
