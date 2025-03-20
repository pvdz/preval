# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Statement > Throw > Auto ident array complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw [$(1), 2, $(3)];
$(a);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(1);
const tmpArrElement$3 /*:unknown*/ = $(3);
const tmpThrowArg /*:array*/ = [tmpArrElement, 2, tmpArrElement$3];
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const tmpThrowArg = [tmpArrElement, 2, tmpArrElement$3];
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = [ a, 2, b ];
throw c;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: ('<crash[ 1,2,3 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
