# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident opt method call simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: $ };

    let a = b?.c(1);
    $(a);
}
`````

## Settled


`````js filename=intro
const tmpClusterSSA_b /*:object*/ = { c: $ };
const tmpChainElementCall /*:unknown*/ = tmpClusterSSA_b.c(1);
$(tmpChainElementCall);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ c: $ }.c(1));
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let b;
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    b = { c: $ };
    a = b?.c(1);
    $(a);
  } else {
  }
}
`````

## Normalized


`````js filename=intro
let b = undefined;
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  b = { c: $ };
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = tmpChainRootProp.c(1);
    a = tmpChainElementCall;
    $(tmpChainElementCall);
  } else {
    $(a);
  }
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = a.c( 1 );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
