# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident c-opt complex complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 };

    let a = $(b)?.[$("x")];
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````


## Settled


`````js filename=intro
const tmpClusterSSA_b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(tmpClusterSSA_b);
const tmpIfTest$5 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$5) {
  $(undefined);
  $(`fail1`);
  $(`fail2`);
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  $(tmpChainElementObject);
  $(`fail1`);
  $(`fail2`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $({ x: 1 });
if (tmpChainElementCall == null) {
  $(undefined);
  $(`fail1`);
  $(`fail2`);
} else {
  const tmpChainRootComputed = $(`x`);
  $(tmpChainElementCall[tmpChainRootComputed]);
  $(`fail1`);
  $(`fail2`);
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
  $( "fail1" );
  $( "fail2" );
}
else {
  const d = $( "x" );
  const e = b[ d ];
  $( e );
  $( "fail1" );
  $( "fail2" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: 1
 - 4: 'fail1'
 - 5: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
