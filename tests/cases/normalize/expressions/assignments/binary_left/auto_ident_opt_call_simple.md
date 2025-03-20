# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Binary left > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $?.(1)) + $(100));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
let tmpBinBothLhs /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  a = tmpChainElementCall;
  tmpBinBothLhs = tmpChainElementCall;
}
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
let tmpBinBothLhs = undefined;
if (!($ == null)) {
  const tmpChainElementCall = $(1);
  a = tmpChainElementCall;
  tmpBinBothLhs = tmpChainElementCall;
}
$(tmpBinBothLhs + $(100));
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
let b = undefined;
const c = $ == null;
if (c) {

}
else {
  const d = $( 1 );
  a = d;
  b = d;
}
const e = $( 100 );
const f = b + e;
$( f );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 101
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
