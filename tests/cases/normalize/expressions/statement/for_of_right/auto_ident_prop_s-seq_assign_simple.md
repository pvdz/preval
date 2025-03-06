# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Statement > For of right > Auto ident prop s-seq assign simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (let x of ((1, 2, b).c = 2));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpForOfGen = $forOf(((1, 2, b).c = 2));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      let x = tmpForOfNext.value;
    }
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const varInitAssignLhsComputedObj = b;
const varInitAssignLhsComputedRhs = 2;
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
const tmpCalleeParam = varInitAssignLhsComputedRhs;
let tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let x = tmpForOfNext.value;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
const tmpForOfGen /*:unknown*/ = $forOf(2);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { c: 2 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $forOf( 2 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a.next();
  const c = b.done;
  if (c) {
    break;
  }
  else {
    b.value;
  }
}
const d = {
  a: 999,
  b: 1000,
};
const e = { c: 2 };
$( d, e );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next