# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > Stmt global block > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
{
  let b = { c: $ };

  let a = { a: 999, b: 1000 };
  a = b?.c(1);
  $(a);
}
`````

## Settled


`````js filename=intro
const b /*:object*/ = { c: $ };
const tmpChainElementCall /*:unknown*/ = b.c(1);
$(tmpChainElementCall);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ c: $ }.c(1));
`````

## Pre Normal


`````js filename=intro
{
  let b = { c: $ };
  let a = { a: 999, b: 1000 };
  a = b?.c(1);
  $(a);
}
`````

## Normalized


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootProp.c(1);
  a = tmpChainElementCall;
  $(tmpChainElementCall);
} else {
  $(a);
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
