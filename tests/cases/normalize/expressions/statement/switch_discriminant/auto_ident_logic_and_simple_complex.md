# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch (1 && $($(1))) {
  default:
    $(100);
}
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
$(tmpCalleeParam);
$(100);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1));
$(100);
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = 1 && $($(1));
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
let tmpSwitchDisc = 1;
if (tmpSwitchDisc) {
  const tmpCalleeParam = $(1);
  tmpSwitchDisc = $(tmpCalleeParam);
} else {
}
$(100);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
$( 100 );
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 100
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
