# Preval test case

# auto_ident_logic_ll_simple_complex.md

> Normalize > Expressions > Statement > Call > Auto ident logic ll simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(0 || $($(1)));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
$(tmpClusterSSA_tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($($(1)));
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(0 || $($(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = 0;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  const tmpCalleeParam$1 = $(1);
  tmpCalleeParam = $(tmpCalleeParam$1);
  $(tmpCalleeParam);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
$( b );
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
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
