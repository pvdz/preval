# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let b = { c: $ };

  let a = { a: 999, b: 1000 };
  a = b?.c(1);
  $(a);
}
$(f());
`````

## Settled


`````js filename=intro
const b /*:object*/ = { c: $ };
const tmpChainElementCall /*:unknown*/ = b.c(1);
$(tmpChainElementCall);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ c: $ }.c(1));
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let b = { c: $ };
  let a = { a: 999, b: 1000 };
  a = b?.c(1);
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = { c: $ };
  let a = { a: 999, b: 1000 };
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementCall = tmpChainRootProp.c(1);
    a = tmpChainElementCall;
  } else {
  }
  $(a);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = a.c( 1 );
$( b );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
