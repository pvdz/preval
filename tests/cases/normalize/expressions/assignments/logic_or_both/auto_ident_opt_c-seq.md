# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b))?.x) || (a = (1, 2, $(b))?.x));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainRootProp /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainRootProp.x;
  a = tmpChainElementObject;
}
if (a) {
  $(a);
  $(a);
} else {
  const tmpChainRootProp$1 /*:unknown*/ = $(b);
  const tmpIfTest$1 /*:boolean*/ = tmpChainRootProp$1 == null;
  if (tmpIfTest$1) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainRootProp$1.x;
    $(tmpChainElementObject$1);
    $(tmpChainElementObject$1);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const tmpChainRootProp = $(b);
if (!(tmpChainRootProp == null)) {
  a = tmpChainRootProp.x;
}
if (a) {
  $(a);
  $(a);
} else {
  const tmpChainRootProp$1 = $(b);
  if (tmpChainRootProp$1 == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainElementObject$1 = tmpChainRootProp$1.x;
    $(tmpChainElementObject$1);
    $(tmpChainElementObject$1);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = c == null;
if (d) {

}
else {
  const e = c.x;
  a = e;
}
if (a) {
  $( a );
  $( a );
}
else {
  const f = $( b );
  const g = f == null;
  if (g) {
    $( undefined );
    $( undefined );
  }
  else {
    const h = f.x;
    $( h );
    $( h );
  }
}
`````


## Todos triggered


None


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
