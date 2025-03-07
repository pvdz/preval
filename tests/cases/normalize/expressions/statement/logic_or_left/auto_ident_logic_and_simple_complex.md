# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > Logic or left > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(1 && $($(1))) || $(100);
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpClusterSSA_tmpIfTest) {
} else {
  $(100);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$($(1))) {
  $(100);
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
(1 && $($(1))) || $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = 1;
if (tmpIfTest) {
  const tmpCalleeParam = $(1);
  tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
  } else {
    $(100);
  }
} else {
  $(100);
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
  $( 100 );
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
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
