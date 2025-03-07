# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Let > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = $($(0)) || $($(1)) || $($(2));
$(xyz);
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let xyz /*:unknown*/ = $(tmpCalleeParam);
if (xyz) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  xyz = $(tmpCalleeParam$1);
  if (xyz) {
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    xyz = $(tmpCalleeParam$3);
  }
}
$(xyz);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let xyz = $($(0));
if (!xyz) {
  xyz = $($(1));
  if (!xyz) {
    xyz = $($(2));
  }
}
$(xyz);
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = $($(0)) || $($(1)) || $($(2));
$(xyz);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
let xyz = $(tmpCalleeParam);
if (xyz) {
} else {
  const tmpCalleeParam$1 = $(1);
  xyz = $(tmpCalleeParam$1);
  if (xyz) {
  } else {
    const tmpCalleeParam$3 = $(2);
    xyz = $(tmpCalleeParam$3);
  }
}
$(xyz);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {

  }
  else {
    const d = $( 2 );
    b = $( d );
  }
}
$( b );
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
