# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b))?.x) && (a = (1, 2, $(b))?.x));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainRootProp /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
if (tmpIfTest) {
} else {
  a = tmpChainRootProp.x;
}
if (a) {
  const tmpChainRootProp$1 /*:unknown*/ = $(b);
  const tmpIfTest$1 /*:boolean*/ = tmpChainRootProp$1 == null;
  if (tmpIfTest$1) {
    $(undefined);
    $(undefined);
  } else {
    const tmpNestedComplexRhs /*:unknown*/ = tmpChainRootProp$1.x;
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  }
} else {
  $(a);
  $(a);
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
  const tmpChainRootProp$1 = $(b);
  if (tmpChainRootProp$1 == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpNestedComplexRhs = tmpChainRootProp$1.x;
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  }
} else {
  $(a);
  $(a);
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
  a = c.x;
}
if (a) {
  const e = $( b );
  const f = e == null;
  if (f) {
    $( undefined );
    $( undefined );
  }
  else {
    const g = e.x;
    $( g );
    $( g );
  }
}
else {
  $( a );
  $( a );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
