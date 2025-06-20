# Preval test case

# auto_ident_logic_ll_simple_complex.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident logic ll simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch (0 || $($(1))) {
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
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1));
$(100);
$({ a: 999, b: 1000 });
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpSwitchDisc = 0;
if (tmpSwitchDisc) {
  $(100);
  $(a);
} else {
  let tmpCalleeParam = $(1);
  tmpSwitchDisc = $(tmpCalleeParam);
  $(100);
  $(a);
}
`````


## Todos triggered


None


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
