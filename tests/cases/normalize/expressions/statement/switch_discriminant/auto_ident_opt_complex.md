# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident opt complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(b)?.x) {
  default:
    $(100);
}
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  tmpChainElementCall.x;
  $(100);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $({ x: 1 });
const tmpIfTest = tmpChainElementCall == null;
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  tmpChainElementCall.x;
  $(100);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = b == null;
const d = {
  a: 999,
  b: 1000,
};
if (c) {
  $( 100 );
  $( d );
}
else {
  b.x;
  $( 100 );
  $( d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpSwitchDisc = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.x;
  tmpSwitchDisc = tmpChainElementObject;
  $(100);
  $(a);
} else {
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
 - 1: { x: '1' }
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
