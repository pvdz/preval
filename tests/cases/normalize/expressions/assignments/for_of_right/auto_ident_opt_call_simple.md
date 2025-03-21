# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > For of right > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = $?.(1)));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
let tmpForOfGen /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
  tmpForOfGen = $forOf(undefined);
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  a = tmpChainElementCall;
  tmpForOfGen = $forOf(tmpChainElementCall);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest$1 /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest$1) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
let tmpForOfGen = undefined;
if ($ == null) {
  tmpForOfGen = $forOf(undefined);
} else {
  const tmpChainElementCall = $(1);
  a = tmpChainElementCall;
  tmpForOfGen = $forOf(tmpChainElementCall);
}
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForOfGen = $forOf((a = $?.(1)));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      let x = tmpForOfNext.value;
    }
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  a = tmpChainElementCall;
} else {
}
let tmpCalleeParam = a;
let tmpForOfGen = $forOf(a);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest$1 = tmpForOfNext.done;
  if (tmpIfTest$1) {
    break;
  } else {
    let x = tmpForOfNext.value;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
let b = undefined;
const c = $ == null;
if (c) {
  b = $forOf( undefined );
}
else {
  const d = $( 1 );
  a = d;
  b = $forOf( d );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = b.next();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    e.value;
  }
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next
