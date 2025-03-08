# Preval test case

# ctxt_opt_ab_undef_b.md

> Normalize > Optional > Ctxt opt ab undef b
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = {};
$($(a)?.b?.c(100));
`````

## Settled


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
const a /*:object*/ = {};
const tmpChainElementCall /*:unknown*/ = $(a);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.b;
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementCall$1 /*:unknown*/ = tmpChainElementObject.c(100);
    tmpCalleeParam = tmpChainElementCall$1;
  }
}
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpChainElementCall = $({});
if (!(tmpChainElementCall == null)) {
  const tmpChainElementObject = tmpChainElementCall.b;
  if (!(tmpChainElementObject == null)) {
    tmpCalleeParam = tmpChainElementObject.c(100);
  }
}
$(tmpCalleeParam);
`````

## Pre Normal


`````js filename=intro
const a = {};
$($(a)?.b?.c(100));
`````

## Normalized


`````js filename=intro
const a = {};
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(a);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.b;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall$1 = tmpChainElementObject.c(100);
    tmpCalleeParam = tmpChainElementCall$1;
  } else {
  }
} else {
}
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = {};
const c = $( b );
const d = c == null;
if (d) {

}
else {
  const e = c.b;
  const f = e == null;
  if (f) {

  }
  else {
    const g = e.c( 100 );
    a = g;
  }
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
