# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Assignments > For in right > Auto ident opt complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (let x in (a = $(b)?.x));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpForInGen /*:unknown*/ = undefined;
if (tmpIfTest) {
  tmpForInGen = $forIn(undefined);
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.x;
  a = tmpChainElementObject;
  tmpForInGen = $forIn(tmpChainElementObject);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
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
const tmpChainElementCall = $({ x: 1 });
const tmpIfTest = tmpChainElementCall == null;
let tmpForInGen = undefined;
if (tmpIfTest) {
  tmpForInGen = $forIn(undefined);
} else {
  const tmpChainElementObject = tmpChainElementCall.x;
  a = tmpChainElementObject;
  tmpForInGen = $forIn(tmpChainElementObject);
}
while (true) {
  const tmpForInNext = tmpForInGen.next();
  if (tmpForInNext.done) {
    break;
  } else {
    tmpForInNext.value;
  }
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpForInGen = $forIn((a = $(b)?.x));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      let x = tmpForInNext.value;
    }
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.x;
  a = tmpChainElementObject;
} else {
}
let tmpCalleeParam = a;
let tmpForInGen = $forIn(a);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest$1 = tmpForInNext.done;
  if (tmpIfTest$1) {
    break;
  } else {
    let x = tmpForInNext.value;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = c == null;
let e = undefined;
if (d) {
  e = $forIn( undefined );
}
else {
  const f = c.x;
  a = f;
  e = $forIn( f );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const g = e.next();
  const h = g.done;
  if (h) {
    break;
  }
  else {
    g.value;
  }
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next