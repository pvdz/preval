# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident opt c-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 };

    let a = (1, 2, $(b))?.x;
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
const tmpChainRootProp /*:unknown*/ = $(tmpClusterSSA_b);
const tmpIfTest$5 /*:boolean*/ = tmpChainRootProp == null;
if (tmpIfTest$5) {
  $(undefined);
  $(`fail1`);
  $(`fail2`);
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainRootProp.x;
  $(tmpChainElementObject);
  $(`fail1`);
  $(`fail2`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainRootProp = $({ x: 1 });
if (tmpChainRootProp == null) {
  $(undefined);
  $(`fail1`);
  $(`fail2`);
} else {
  $(tmpChainRootProp.x);
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
  const d = b.x;
  $( d );
  $( "fail1" );
  $( "fail2" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 'fail1'
 - 4: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
