# Preval test case

# computed_prop_2.md

> Expr order > Computed prop 2
>
> The object is evaluated before the computed property

This was once how the original test case got normalized. I want to make sure this case gets statementified too.

## Input

`````js filename=intro
var a;
var b;
var c;
(
  (a = $(1)), 
  (b = a), 
  (c = $(2)), 
  b
)[$(c)];
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const c /*:unknown*/ = $(2);
const tmpCompProp /*:unknown*/ = $(c);
a[tmpCompProp];
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
const tmpCompProp = $($(2));
a[tmpCompProp];
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = $( b );
a[ c ];
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
