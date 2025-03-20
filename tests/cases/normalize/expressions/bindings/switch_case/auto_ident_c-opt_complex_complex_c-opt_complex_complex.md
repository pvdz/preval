# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: { y: 1 } };

    let a = $(b)?.[$("x")]?.[$("y")];
    $(a);
}
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = { y: 1 };
const tmpClusterSSA_b /*:object*/ = { x: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(tmpClusterSSA_b);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
  $(undefined);
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$3) {
    $(undefined);
  } else {
    const tmpChainRootComputed$1 /*:unknown*/ = $(`y`);
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject[tmpChainRootComputed$1];
    $(tmpChainElementObject$1);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = { y: 1 };
const tmpChainElementCall = $({ x: tmpObjLitVal });
if (tmpChainElementCall == null) {
  $(undefined);
} else {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (tmpChainElementObject == null) {
    $(undefined);
  } else {
    const tmpChainRootComputed$1 = $(`y`);
    $(tmpChainElementObject[tmpChainRootComputed$1]);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = { x: a };
const c = $( b );
const d = c == null;
if (d) {
  $( undefined );
}
else {
  const e = $( "x" );
  const f = c[ e ];
  const g = f == null;
  if (g) {
    $( undefined );
  }
  else {
    const h = $( "y" );
    const i = f[ h ];
    $( i );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
