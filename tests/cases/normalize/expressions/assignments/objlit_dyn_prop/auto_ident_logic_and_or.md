# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = ($($(1)) && $($(1))) || $($(2)))]: 10 });
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$3);
} else {
}
let tmpObjLitPropKey /*:unknown*/ = undefined;
if (a) {
  tmpObjLitPropKey = a;
} else {
  const tmpCalleeParam$5 /*:unknown*/ = $(2);
  a = $(tmpCalleeParam$5);
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
if (a) {
  a = $($(1));
}
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
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
let d = undefined;
if (b) {
  d = b;
}
else {
  const e = $( 2 );
  b = $( e );
  d = b;
}
const f = { [ d ]: 10 };
$( f );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: { 1: '10' }
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
