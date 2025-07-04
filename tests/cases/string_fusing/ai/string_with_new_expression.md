# Preval test case

# string_with_new_expression.md

> String fusing > Ai > String with new expression
>
> Test string concatenation with new expressions

## Input

`````js filename=intro
const result = "object: " + new String($("test"));
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`test`);
const tmpBinBothRhs /*:object*/ /*truthy*/ = new $string_constructor(tmpCalleeParam);
const tmpStringConcatL /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const result /*:string*/ /*truthy*/ = `object: ${tmpStringConcatL}`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(`test`);
const tmpStringConcatL = new $string_constructor(tmpCalleeParam) + ``;
$(`object: ${tmpStringConcatL}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = new $string_constructor( a );
const c = $coerce( b, "plustr" );
const d = `object: ${c}`;
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = `object: `;
const tmpNewCallee = String;
let tmpCalleeParam = $(`test`);
const tmpBinBothRhs = new tmpNewCallee(tmpCalleeParam);
const result = tmpBinBothLhs + tmpBinBothRhs;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: 'object: test'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
