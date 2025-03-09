# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident cond c-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((10, 20, $(30)) ? (40, 50, $(60)) : $($(100))) {
  default:
    $(100);
}
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(30);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(60);
  $(100);
  $(a);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpCalleeParam);
  $(100);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(30);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(60);
  $(100);
  $(a);
} else {
  $($(100));
  $(100);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100));
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
let tmpSwitchDisc = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpSwitchDisc = $(60);
  $(100);
  $(a);
} else {
  const tmpCalleeParam = $(100);
  tmpSwitchDisc = $(tmpCalleeParam);
  $(100);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 30 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( 60 );
  $( 100 );
  $( b );
}
else {
  const c = $( 100 );
  $( c );
  $( 100 );
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: 100
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
