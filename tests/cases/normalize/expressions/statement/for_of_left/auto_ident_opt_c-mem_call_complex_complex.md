# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Statement > For of left > Auto ident opt c-mem call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (($(b)?.[$("$")]?.($(1))).x of $({ x: 1 }));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
const b /*:object*/ = { $: $ };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let tmpAssignMemLhsObj /*:unknown*/ = undefined;
    const tmpChainElementCall /*:unknown*/ = $(b);
    const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
    if (tmpIfTest$1) {
    } else {
      const tmpChainRootComputed /*:unknown*/ = $(`\$`);
      const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
      const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject == null;
      if (tmpIfTest$3) {
      } else {
        const tmpCalleeParam$7 /*:unknown*/ = $(1);
        const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam$7);
        tmpAssignMemLhsObj = tmpChainElementCall$1;
      }
    }
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGen = $forOf($({ x: 1 }));
const b = { $: $ };
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
    break;
  } else {
    let tmpAssignMemLhsObj = undefined;
    const tmpChainElementCall = $(b);
    if (!(tmpChainElementCall == null)) {
      const tmpChainRootComputed = $(`\$`);
      const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
      if (!(tmpChainElementObject == null)) {
        tmpAssignMemLhsObj = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, $(1));
      }
    }
    tmpAssignMemLhsObj.x = tmpForOfNext.value;
  }
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  let tmpForOfGen = $forOf($({ x: 1 }));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      ($(b)?.[$(`\$`)]?.($(1))).x = tmpForOfNext.value;
    }
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = { x: 1 };
const tmpCalleeParam = $(tmpCalleeParam$1);
let tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let tmpAssignMemLhsObj = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall(b);
    const tmpIfTest$1 = tmpChainElementCall != null;
    if (tmpIfTest$1) {
      const tmpChainRootComputed = $(`\$`);
      const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
      const tmpIfTest$3 = tmpChainElementObject != null;
      if (tmpIfTest$3) {
        const tmpCalleeParam$3 = tmpChainElementObject;
        const tmpCalleeParam$5 = tmpChainElementCall;
        const tmpCalleeParam$7 = $(1);
        const tmpChainElementCall$1 = $dotCall(tmpCalleeParam$3, tmpCalleeParam$5, undefined, tmpCalleeParam$7);
        tmpAssignMemLhsObj = tmpChainElementCall$1;
      } else {
      }
    } else {
    }
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForOfNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $forOf( b );
const d = { $: $ };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = c.next();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    let g = undefined;
    const h = $( d );
    const i = h == null;
    if (i) {

    }
    else {
      const j = $( "$" );
      const k = h[ j ];
      const l = k == null;
      if (l) {

      }
      else {
        const m = $( 1 );
        const n = $dotCall( k, h, undefined, m );
        g = n;
      }
    }
    const o = e.value;
    g.x = o;
  }
}
const p = {
  a: 999,
  b: 1000,
};
$( p );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next