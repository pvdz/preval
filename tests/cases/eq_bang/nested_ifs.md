# Preval test case

# nested_ifs.md

> Eq bang > Nested ifs
>
> Trying to come up with an example where one change will impact another

## Input

`````js filename=intro
const a = $(1) === $(2);
if (!a) {
  $('then a1');
  const b = $(1) === $(2);
  if (!b) {
    $('then b1');
  } else {
    $('else b1');
  }

} else {
  $('else a1');
  const c = $(1) === $(2);
  if (!c) {
    $('then c1');
  } else {
    $('else c1');
  }
}
if (!a) {
  $('then a2');
} else {
  $('else a2');
}
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(2);
const a /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
if (a) {
  $(`else a1`);
  const tmpBinBothLhs$1 /*:unknown*/ = $(1);
  const tmpBinBothRhs$1 /*:unknown*/ = $(2);
  const c /*:boolean*/ = tmpBinBothLhs$1 === tmpBinBothRhs$1;
  if (c) {
    $(`else c1`);
    $(`else a2`);
  } else {
    $(`then c1`);
    $(`else a2`);
  }
} else {
  $(`then a1`);
  const tmpBinBothLhs$3 /*:unknown*/ = $(1);
  const tmpBinBothRhs$3 /*:unknown*/ = $(2);
  const b /*:boolean*/ = tmpBinBothLhs$3 === tmpBinBothRhs$3;
  if (b) {
    $(`else b1`);
    $(`then a2`);
  } else {
    $(`then b1`);
    $(`then a2`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === $(2)) {
  $(`else a1`);
  if ($(1) === $(2)) {
    $(`else c1`);
    $(`else a2`);
  } else {
    $(`then c1`);
    $(`else a2`);
  }
} else {
  $(`then a1`);
  if ($(1) === $(2)) {
    $(`else b1`);
    $(`then a2`);
  } else {
    $(`then b1`);
    $(`then a2`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a === b;
if (c) {
  $( "else a1" );
  const d = $( 1 );
  const e = $( 2 );
  const f = d === e;
  if (f) {
    $( "else c1" );
    $( "else a2" );
  }
  else {
    $( "then c1" );
    $( "else a2" );
  }
}
else {
  $( "then a1" );
  const g = $( 1 );
  const h = $( 2 );
  const i = g === h;
  if (i) {
    $( "else b1" );
    $( "then a2" );
  }
  else {
    $( "then b1" );
    $( "then a2" );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'then a1'
 - 4: 1
 - 5: 2
 - 6: 'then b1'
 - 7: 'then a2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
