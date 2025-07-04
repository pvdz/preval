# Preval test case

# string_with_array_element.md

> String fusing > Ai > String with array element
>
> Test string concatenation with array element access

## Input

`````js filename=intro
const arr = [$("first"), $("second")];
const result = "prefix" + arr[0];
$(result);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(`first`);
$(`second`);
const tmpStringConcatL /*:string*/ = $coerce(tmpArrElement, `plustr`);
const result /*:string*/ /*truthy*/ = `prefix${tmpStringConcatL}`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(`first`);
$(`second`);
const tmpStringConcatL = tmpArrElement + ``;
$(`prefix${tmpStringConcatL}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "first" );
$( "second" );
const b = $coerce( a, "plustr" );
const c = `prefix${b}`;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = $(`first`);
const tmpArrElement$1 = $(`second`);
const arr = [tmpArrElement, tmpArrElement$1];
const tmpBinBothLhs = `prefix`;
const tmpBinBothRhs = arr[0];
const result = tmpBinBothLhs + tmpBinBothRhs;
$(result);
`````


## Todos triggered


- (todo) can we always safely clone ident refs in this case?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'first'
 - 2: 'second'
 - 3: 'prefixfirst'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
