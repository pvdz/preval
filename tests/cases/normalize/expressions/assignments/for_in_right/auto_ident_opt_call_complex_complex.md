# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > For in right > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = $($)?.($(1))));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpForInGen /*:unknown*/ /*ternaryConst*/ = undefined;
if (tmpIfTest) {
  tmpForInGen = $forIn(undefined);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  a = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam$1);
  tmpForInGen = $forIn(a);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest$1 /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest$1) {
    break;
  } else {
    tmpForInNext.value;
  }
}
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
let tmpForInGen = undefined;
if (tmpIfTest) {
  tmpForInGen = $forIn(undefined);
} else {
  a = $dotCall(tmpChainElementCall, $, undefined, $(1));
  tmpForInGen = $forIn(a);
}
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    tmpForInNext.value;
  }
}
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( $ );
const c = b == null;
let d = undefined;
if (c) {
  d = $forIn( undefined );
}
else {
  const e = $( 1 );
  a = $dotCall( b, $, undefined, e );
  d = $forIn( a );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = d();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    f.value;
  }
}
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
