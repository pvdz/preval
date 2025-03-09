# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > Tagged > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${$($)?.($(1))} after`;
$(a);
`````

## Settled


`````js filename=intro
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(tmpCalleeParam, undefined);
  $(a);
} else {
  const tmpCalleeParam$7 /*:unknown*/ = $(1);
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam$7);
  $(tmpCalleeParam, tmpChainElementCall$1);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
const tmpCalleeParam = [`before `, ` after`];
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(tmpCalleeParam, undefined);
  $(a);
} else {
  $(tmpCalleeParam, $dotCall(tmpChainElementCall, $, undefined, $(1)));
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], $($)?.($(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
let tmpCalleeParam$1 = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpCalleeParam$3 = tmpChainElementCall;
  const tmpCalleeParam$5 = tmpChainRootCall;
  const tmpCalleeParam$7 = $(1);
  const tmpChainElementCall$1 = $dotCall(tmpCalleeParam$3, tmpCalleeParam$5, undefined, tmpCalleeParam$7);
  tmpCalleeParam$1 = tmpChainElementCall$1;
  $(tmpCalleeParam, tmpChainElementCall$1);
  $(a);
} else {
  $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = a == null;
const c = [ "before ", " after" ];
const d = {
  a: 999,
  b: 1000,
};
if (b) {
  $( c, undefined );
  $( d );
}
else {
  const e = $( 1 );
  const f = $dotCall( a, $, undefined, e );
  $( c, f );
  $( d );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: ['before ', ' after'], 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
