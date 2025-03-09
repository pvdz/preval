# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = $?.(1))} after`;
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:boolean*/ = $ == null;
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
if (tmpIfTest) {
  $(tmpCalleeParam, undefined);
  $(undefined);
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  $(tmpCalleeParam, tmpChainElementCall);
  $(tmpChainElementCall);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $ == null;
const tmpCalleeParam = [`before `, ` after`];
if (tmpIfTest) {
  $(tmpCalleeParam, undefined);
  $(undefined);
} else {
  const tmpChainElementCall = $(1);
  $(tmpCalleeParam, tmpChainElementCall);
  $(tmpChainElementCall);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = $?.(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
a = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  a = tmpChainElementCall;
} else {
}
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
const b = [ "before ", " after" ];
if (a) {
  $( b, undefined );
  $( undefined );
}
else {
  const c = $( 1 );
  $( b, c );
  $( c );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: ['before ', ' after'], 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
