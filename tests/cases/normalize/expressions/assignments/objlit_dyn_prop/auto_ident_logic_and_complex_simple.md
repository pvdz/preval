# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident logic and complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = $($(1)) && 2)]: 10 });
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam$1);
let tmpObjLitPropKey /*:unknown*/ = 2;
if (a) {
  a = 2;
} else {
  tmpObjLitPropKey = a;
}
const tmpCalleeParam /*:object*/ = { [tmpObjLitPropKey]: 10 };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(1));
let tmpObjLitPropKey = 2;
if (a) {
  a = 2;
} else {
  tmpObjLitPropKey = a;
}
$({ [tmpObjLitPropKey]: 10 });
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
let c = 2;
if (b) {
  b = 2;
}
else {
  c = b;
}
const d = { [ c ]: 10 };
$( d );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { 2: '10' }
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
