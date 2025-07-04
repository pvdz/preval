# Preval test case

# string_with_array_expression.md

> String fusing > Ai > String with array expression
>
> Test string concatenation with array expressions

## Input

`````js filename=intro
const arr = [$("first"), $("second")];
const result = "array: " + arr;
$(result);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(`first`);
const tmpArrElement$1 /*:unknown*/ = $(`second`);
const arr /*:array*/ /*truthy*/ = [tmpArrElement, tmpArrElement$1];
const tmpStringConcatL /*:string*/ = $coerce(arr, `plustr`);
const result /*:string*/ /*truthy*/ = `array: ${tmpStringConcatL}`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(`first`);
const tmpArrElement$1 = $(`second`);
const tmpStringConcatL = [tmpArrElement, tmpArrElement$1] + ``;
$(`array: ${tmpStringConcatL}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "first" );
const b = $( "second" );
const c = [ a, b ];
const d = $coerce( c, "plustr" );
const e = `array: ${d}`;
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = $(`first`);
const tmpArrElement$1 = $(`second`);
const arr = [tmpArrElement, tmpArrElement$1];
const tmpStringConcatL = $coerce(arr, `plustr`);
const result = `array: ${tmpStringConcatL}`;
$(result);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'first'
 - 2: 'second'
 - 3: 'array: first,second'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
