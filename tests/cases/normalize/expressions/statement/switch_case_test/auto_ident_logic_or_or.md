# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Switch case test > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $($(0)) || $($(1)) || $($(2)):
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpBinBothRhs /*:unknown*/ = $(tmpCalleeParam);
if (tmpBinBothRhs) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpBinBothRhs /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpBinBothRhs) {
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    $(tmpCalleeParam$3);
  }
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
if (!$($(0))) {
  if (!$($(1))) {
    $($(2));
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 0 );
const b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  const d = $( c );
  if (d) {

  }
  else {
    const e = $( 2 );
    $( e );
  }
}
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
let tmpCalleeParam = $(0);
let tmpBinBothRhs = $(tmpCalleeParam);
if (tmpBinBothRhs) {
} else {
  let tmpCalleeParam$1 = $(1);
  tmpBinBothRhs = $(tmpCalleeParam$1);
  if (tmpBinBothRhs) {
  } else {
    let tmpCalleeParam$3 = $(2);
    tmpBinBothRhs = $(tmpCalleeParam$3);
  }
}
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
