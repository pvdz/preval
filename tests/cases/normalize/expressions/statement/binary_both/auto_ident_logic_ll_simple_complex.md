# Preval test case

# auto_ident_logic_ll_simple_complex.md

> Normalize > Expressions > Statement > Binary both > Auto ident logic ll simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(0 || $($(1))) + (0 || $($(1)));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpBinBothLhs /*:unknown*/ = $(tmpCalleeParam);
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(tmpCalleeParam$1);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1)) + $($(1));
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
(0 || $($(1))) + (0 || $($(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = 0;
if (tmpBinBothLhs) {
} else {
  const tmpCalleeParam = $(1);
  tmpBinBothLhs = $(tmpCalleeParam);
}
let tmpBinBothRhs = 0;
if (tmpBinBothRhs) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpBinBothRhs = $(tmpCalleeParam$1);
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
const c = $( 1 );
const d = $( c );
b + d;
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
