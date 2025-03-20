# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident cond c-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = (10, 20, $(30)) ? $(2) : $($(100)))]);
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(30);
let tmpArrSpread /*:unknown*/ = undefined;
if (tmpIfTest) {
  a = $(2);
  tmpArrSpread = a;
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  a = $(tmpCalleeParam$1);
  tmpArrSpread = a;
}
const tmpCalleeParam /*:array*/ = [...tmpArrSpread];
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpIfTest = $(30);
let tmpArrSpread = undefined;
if (tmpIfTest) {
  a = $(2);
  tmpArrSpread = a;
} else {
  a = $($(100));
  tmpArrSpread = a;
}
$([...tmpArrSpread]);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 30 );
let c = undefined;
if (b) {
  a = $( 2 );
  c = a;
}
else {
  const d = $( 100 );
  a = $( d );
  c = a;
}
const e = [ ...c ];
$( e );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
