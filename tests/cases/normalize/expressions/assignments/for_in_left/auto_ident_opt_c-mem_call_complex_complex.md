# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > For in left > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for ((a = $(b)?.[$("$")]?.($(1))).x in $({ x: 1 }));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  let tmpForInGen = $forIn($({ x: 1 }));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      (a = $(b)?.[$(`\$`)]?.($(1))).x = tmpForInNext.value;
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
let tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    a = undefined;
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
        a = tmpChainElementCall$1;
      } else {
      }
    } else {
    }
    let tmpAssignMemLhsObj = a;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForInNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
const b /*:object*/ = { $: $ };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    a = undefined;
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
        a = tmpChainElementCall$1;
      }
    }
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    a.x = tmpAssignMemRhs;
  }
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = { x: 1 };
const c = $( b );
const d = $forIn( c );
const e = { $: $ };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = d.next();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    a = undefined;
    const h = $( e );
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
        a = n;
      }
    }
    const o = f.value;
    a.x = o;
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: 1
 - eval returned: ("<crash[ Cannot create property 'x' on number '1' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- objects in isFree check
- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next