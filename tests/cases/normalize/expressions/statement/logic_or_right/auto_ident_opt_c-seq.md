# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Statement > Logic or right > Auto ident opt c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(100) || (1, 2, $(b))?.x;
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const b /*:object*/ /*truthy*/ = { x: 1 };
  const tmpChainRootProp /*:unknown*/ = $(b);
  const tmpIfTest$1 /*:boolean*/ = tmpChainRootProp == null;
  if (tmpIfTest$1) {
    $(a);
  } else {
    tmpChainRootProp.x;
    $(a);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpChainRootProp = $({ x: 1 });
  if (tmpChainRootProp == null) {
    $(a);
  } else {
    tmpChainRootProp.x;
    $(a);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( b );
}
else {
  const c = { x: 1 };
  const d = $( c );
  const e = d == null;
  if (e) {
    $( b );
  }
  else {
    d.x;
    $( b );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  $(a);
} else {
  const tmpChainRootProp = $(b);
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.x;
    $(a);
  } else {
    $(a);
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
