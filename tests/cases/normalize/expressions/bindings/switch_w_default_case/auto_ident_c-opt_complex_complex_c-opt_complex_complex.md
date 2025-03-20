# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident c-opt complex complex c-opt complex complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: { y: 1 } };

    let a = $(b)?.[$("x")]?.[$("y")];
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = { y: 1 };
const tmpClusterSSA_b /*:object*/ = { x: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(tmpClusterSSA_b);
const tmpIfTest$5 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$5) {
  $(undefined);
  $(`fail1`);
  $(`fail2`);
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$7 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$7) {
    $(undefined);
    $(`fail1`);
    $(`fail2`);
  } else {
    const tmpChainRootComputed$1 /*:unknown*/ = $(`y`);
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject[tmpChainRootComputed$1];
    $(tmpChainElementObject$1);
    $(`fail1`);
    $(`fail2`);
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
  $(`fail1`);
  $(`fail2`);
} else {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (tmpChainElementObject == null) {
    $(undefined);
    $(`fail1`);
    $(`fail2`);
  } else {
    const tmpChainRootComputed$1 = $(`y`);
    $(tmpChainElementObject[tmpChainRootComputed$1]);
    $(`fail1`);
    $(`fail2`);
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
  $( "fail1" );
  $( "fail2" );
}
else {
  const e = $( "x" );
  const f = c[ e ];
  const g = f == null;
  if (g) {
    $( undefined );
    $( "fail1" );
    $( "fail2" );
  }
  else {
    const h = $( "y" );
    const i = f[ h ];
    $( i );
    $( "fail1" );
    $( "fail2" );
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
 - 5: 'fail1'
 - 6: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
