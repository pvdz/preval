# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident opt complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let b = { x: 1 };

  let a = { a: 999, b: 1000 };
  a = $(b)?.x;
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  $(undefined);
  $(undefined);
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.x;
  $(tmpChainElementObject);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $({ x: 1 });
if (tmpChainElementCall == null) {
  $(undefined);
  $(undefined);
} else {
  $(tmpChainElementCall.x);
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = b == null;
if (c) {
  $( undefined );
  $( undefined );
}
else {
  const d = b.x;
  $( d );
  $( undefined );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
