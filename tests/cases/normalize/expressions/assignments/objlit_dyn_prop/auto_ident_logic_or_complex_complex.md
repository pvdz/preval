# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = $($(0)) || $($(2)))]: 10 });
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
let a /*:unknown*/ = $(tmpCalleeParam$1);
let tmpObjLitPropKey /*:unknown*/ = undefined;
if (a) {
  tmpObjLitPropKey = a;
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  a = $(tmpCalleeParam$3);
  tmpObjLitPropKey = a;
}
const tmpCalleeParam /*:object*/ = { [tmpObjLitPropKey]: 10 };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(0));
let tmpObjLitPropKey = undefined;
if (a) {
  tmpObjLitPropKey = a;
} else {
  a = $($(2));
  tmpObjLitPropKey = a;
}
$({ [tmpObjLitPropKey]: 10 });
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
let c = undefined;
if (b) {
  c = b;
}
else {
  const d = $( 2 );
  b = $( d );
  c = b;
}
const e = { [ c ]: 10 };
$( e );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: { 2: '10' }
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
