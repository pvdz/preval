# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > Call > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b))?.x));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpChainRootProp /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
if (tmpIfTest) {
  $(undefined);
  $(undefined);
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainRootProp.x;
  $(tmpChainElementObject);
  $(tmpChainElementObject);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainRootProp = $({ x: 1 });
if (tmpChainRootProp == null) {
  $(undefined);
  $(undefined);
} else {
  const tmpChainElementObject = tmpChainRootProp.x;
  $(tmpChainElementObject);
  $(tmpChainElementObject);
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
  $( d );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
