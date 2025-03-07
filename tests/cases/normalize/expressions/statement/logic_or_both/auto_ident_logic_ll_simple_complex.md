# Preval test case

# auto_ident_logic_ll_simple_complex.md

> Normalize > Expressions > Statement > Logic or both > Auto ident logic ll simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
0 || $($(1)) || 0 || $($(1));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpClusterSSA_tmpIfTest) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  $(tmpCalleeParam$1);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$($(1))) {
  $($(1));
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
0 || $($(1)) || 0 || $($(1));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = 0;
if (tmpIfTest) {
} else {
  const tmpCalleeParam = $(1);
  tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
  } else {
    tmpIfTest = 0;
    if (tmpIfTest) {
    } else {
      const tmpCalleeParam$1 = $(1);
      $(tmpCalleeParam$1);
    }
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  $( c );
}
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
