# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Statement > For of right > Auto ident cond c-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (10, 20, $(30)) ? $(2) : $($(100)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForOfGen = $forOf((10, 20, $(30)) ? $(2) : $($(100)));
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
let tmpCalleeParam = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpCalleeParam = $(2);
} else {
  const tmpCalleeParam$1 = $(100);
  tmpCalleeParam = $(tmpCalleeParam$1);
}
let tmpForOfGen = $forOf(tmpCalleeParam);
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

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(30);
let tmpForOfGen /*:unknown*/ = undefined;
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(2);
  tmpForOfGen = $forOf(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$1);
  tmpForOfGen = $forOf(tmpClusterSSA_tmpCalleeParam$1);
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
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 30 );
let b = undefined;
if (a) {
  const c = $( 2 );
  b = $forOf( c );
}
else {
  const d = $( 100 );
  const e = $( d );
  b = $forOf( e );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = b.next();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    f.value;
  }
}
const h = {
  a: 999,
  b: 1000,
};
$( h );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next