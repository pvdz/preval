# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($?.(1)) {
  default:
    $(100);
}
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:boolean*/ = $ == null;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  $(1);
  $(100);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $ == null;
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  $(1);
  $(100);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $?.(1);
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpSwitchDisc = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  tmpSwitchDisc = tmpChainElementCall;
  $(100);
  $(a);
} else {
  $(100);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( 100 );
  $( b );
}
else {
  $( 1 );
  $( 100 );
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
