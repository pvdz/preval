# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Statement > Logic or both > Auto ident cond c-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
((10, 20, $(30)) ? $(2) : $($(100))) || ((10, 20, $(30)) ? $(2) : $($(100)));
$(a);
`````

## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ = undefined;
const tmpIfTest$1 /*:unknown*/ = $(30);
if (tmpIfTest$1) {
  tmpIfTest = $(2);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  tmpIfTest = $(tmpCalleeParam);
}
if (tmpIfTest) {
} else {
  const tmpIfTest$3 /*:unknown*/ = $(30);
  if (tmpIfTest$3) {
    $(2);
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(100);
    $(tmpCalleeParam$1);
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = undefined;
if ($(30)) {
  tmpIfTest = $(2);
} else {
  tmpIfTest = $($(100));
}
if (!tmpIfTest) {
  if ($(30)) {
    $(2);
  } else {
    $($(100));
  }
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
((10, 20, $(30)) ? $(2) : $($(100))) || ((10, 20, $(30)) ? $(2) : $($(100)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  tmpIfTest = $(2);
} else {
  const tmpCalleeParam = $(100);
  tmpIfTest = $(tmpCalleeParam);
}
if (tmpIfTest) {
} else {
  const tmpIfTest$3 = $(30);
  if (tmpIfTest$3) {
    $(2);
  } else {
    const tmpCalleeParam$1 = $(100);
    $(tmpCalleeParam$1);
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 30 );
if (b) {
  a = $( 2 );
}
else {
  const c = $( 100 );
  a = $( c );
}
if (a) {

}
else {
  const d = $( 30 );
  if (d) {
    $( 2 );
  }
  else {
    const e = $( 100 );
    $( e );
  }
}
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
 - 1: 30
 - 2: 2
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
