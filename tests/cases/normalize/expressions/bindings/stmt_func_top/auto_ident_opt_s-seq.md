# Preval test case

# auto_ident_opt_s-seq.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident opt s-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let b = { x: 1 };

  let a = (1, 2, b)?.x;
  $(a);
}
$(f());
`````

## Settled


`````js filename=intro
$(1);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  let a = (1, 2, b)?.x;
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
  const tmpChainRootProp = b;
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
$( 1 );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
