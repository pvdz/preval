# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident opt call simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = $?.(1);
  $(a);
}
$(f());
`````

## Settled


`````js filename=intro
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
  $(undefined);
  $(undefined);
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  $(tmpChainElementCall);
  $(undefined);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($ == null) {
  $(undefined);
  $(undefined);
} else {
  $($(1));
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = $?.(1);
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = undefined;
  const tmpChainRootCall = $;
  const tmpIfTest = tmpChainRootCall != null;
  if (tmpIfTest) {
    const tmpChainElementCall = tmpChainRootCall(1);
    a = tmpChainElementCall;
    $(tmpChainElementCall);
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
const a = $ == null;
if (a) {
  $( undefined );
  $( undefined );
}
else {
  const b = $( 1 );
  $( b );
  $( undefined );
}
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
