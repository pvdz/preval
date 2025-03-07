# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Statement > Switch default > Auto ident cond c-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    (10, 20, $(30)) ? (40, 50, $(60)) : $($(100));
}
$(a);
`````

## Settled


`````js filename=intro
$(1);
const tmpIfTest /*:unknown*/ = $(30);
if (tmpIfTest) {
  $(60);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpCalleeParam);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
if ($(30)) {
  $(60);
} else {
  $($(100));
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    (10, 20, $(30)) ? (40, 50, $(60)) : $($(100));
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpIfTest = $(30);
if (tmpIfTest) {
  $(60);
} else {
  const tmpCalleeParam = $(100);
  $(tmpCalleeParam);
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 30 );
if (a) {
  $( 60 );
}
else {
  const b = $( 100 );
  $( b );
}
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 30
 - 3: 60
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
