# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident array complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = [$(1), 2, $(3)];
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(1);
const tmpArrElement$3 /*:unknown*/ = $(3);
const a /*:array*/ = [tmpArrElement, 2, tmpArrElement$3];
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
$([tmpArrElement, 2, tmpArrElement$3]);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = [ a, 2, b ];
$( c );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: [1, 2, 3]
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
