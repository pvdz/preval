# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Statement > Switch case block > Auto ident cond c-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    (10, 20, $(30)) ? $(2) : $($(100));
  }
}
$(a);
`````

## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(30);
  if (tmpIfTest$1) {
    $(2);
    $(a);
  } else {
    const tmpCalleeParam /*:unknown*/ = $(100);
    $(tmpCalleeParam);
    $(a);
  }
} else {
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1) === $(1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  if ($(30)) {
    $(2);
    $(a);
  } else {
    $($(100));
    $(a);
  }
} else {
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    {
      (10, 20, $(30)) ? $(2) : $($(100));
    }
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpIfTest$1 = $(30);
  if (tmpIfTest$1) {
    $(2);
    $(a);
  } else {
    const tmpCalleeParam = $(100);
    $(tmpCalleeParam);
    $(a);
  }
} else {
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
const d = {
  a: 999,
  b: 1000,
};
if (c) {
  const e = $( 30 );
  if (e) {
    $( 2 );
    $( d );
  }
  else {
    const f = $( 100 );
    $( f );
    $( d );
  }
}
else {
  $( d );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 30
 - 4: 2
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
