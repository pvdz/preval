# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident opt c-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let b = { x: 1 };

  let a = (1, 2, $(b))?.x;
  $(a);
}
$(f());
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
  $(undefined);
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
  $(tmpChainRootProp.x);
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  let a = (1, 2, $(b))?.x;
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  let a = undefined;
  const tmpChainRootProp = $(b);
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.x;
    a = tmpChainElementObject;
    $(tmpChainElementObject);
    return undefined;
  } else {
    $(a);
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
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
