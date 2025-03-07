# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($($(0)) || ($($(1)) && $($(2)))) {
  default:
    $(100);
}
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpSwitchDisc /*:unknown*/ = $(tmpCalleeParam);
if (tmpSwitchDisc) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpSwitchDisc /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpSwitchDisc) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    $(tmpCalleeParam$3);
  } else {
  }
}
$(100);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$($(0))) {
  if ($($(1))) {
    $($(2));
  }
}
$(100);
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $($(0)) || ($($(1)) && $($(2)));
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
let tmpSwitchDisc = $(tmpCalleeParam);
if (tmpSwitchDisc) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpSwitchDisc = $(tmpCalleeParam$1);
  if (tmpSwitchDisc) {
    const tmpCalleeParam$3 = $(2);
    tmpSwitchDisc = $(tmpCalleeParam$3);
  } else {
  }
}
$(100);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    const e = $( 2 );
    $( e );
  }
}
$( 100 );
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 100
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
