# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Tagged > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${$($(0)) || $($(1)) || $($(2))} after`;
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(0);
const tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$3);
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpCalleeParam$1) {
  $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
} else {
  const tmpCalleeParam$5 /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$5);
  if (tmpClusterSSA_tmpCalleeParam$1) {
    $(tmpCalleeParam, tmpClusterSSA_tmpCalleeParam$1);
    $(a);
  } else {
    const tmpCalleeParam$7 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpCalleeParam$2 /*:unknown*/ = $(tmpCalleeParam$7);
    $(tmpCalleeParam, tmpClusterSSA_tmpCalleeParam$2);
    $(a);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $($(0));
const tmpCalleeParam = [`before `, ` after`];
const a = { a: 999, b: 1000 };
if (tmpCalleeParam$1) {
  $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 = $($(1));
  if (tmpClusterSSA_tmpCalleeParam$1) {
    $(tmpCalleeParam, tmpClusterSSA_tmpCalleeParam$1);
    $(a);
  } else {
    $(tmpCalleeParam, $($(2)));
    $(a);
  }
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], $($(0)) || $($(1)) || $($(2)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpCalleeParam$3 = $(0);
let tmpCalleeParam$1 = $(tmpCalleeParam$3);
if (tmpCalleeParam$1) {
  $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
} else {
  const tmpCalleeParam$5 = $(1);
  tmpCalleeParam$1 = $(tmpCalleeParam$5);
  if (tmpCalleeParam$1) {
    $(tmpCalleeParam, tmpCalleeParam$1);
    $(a);
  } else {
    const tmpCalleeParam$7 = $(2);
    tmpCalleeParam$1 = $(tmpCalleeParam$7);
    $(tmpCalleeParam, tmpCalleeParam$1);
    $(a);
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
const c = [ "before ", " after" ];
const d = {
  a: 999,
  b: 1000,
};
if (b) {
  $( c, b );
  $( d );
}
else {
  const e = $( 1 );
  const f = $( e );
  if (f) {
    $( c, f );
    $( d );
  }
  else {
    const g = $( 2 );
    const h = $( g );
    $( c, h );
    $( d );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: ['before ', ' after'], 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
