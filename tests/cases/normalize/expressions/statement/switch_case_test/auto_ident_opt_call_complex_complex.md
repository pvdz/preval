# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > Switch case test > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $($)?.($(1)):
}
$(a);
`````

## Settled


`````js filename=intro
$(1);
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest$1) {
  $(a);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam$3);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpChainElementCall = $($);
const tmpIfTest$1 = tmpChainElementCall == null;
const a = { a: 999, b: 1000 };
if (tmpIfTest$1) {
  $(a);
} else {
  $dotCall(tmpChainElementCall, $, undefined, $(1));
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $($)?.($(1))) {
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
let tmpBinBothRhs = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $($);
const tmpIfTest$1 = tmpChainElementCall != null;
if (tmpIfTest$1) {
  const tmpCalleeParam = tmpChainElementCall;
  const tmpCalleeParam$1 = tmpChainRootCall;
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$1 = $dotCall(tmpCalleeParam, tmpCalleeParam$1, undefined, tmpCalleeParam$3);
  tmpBinBothRhs = tmpChainElementCall$1;
} else {
}
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( $ );
const b = a == null;
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  $( c );
}
else {
  const d = $( 1 );
  $dotCall( a, $, undefined, d );
  $( c );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
