# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > For in right > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in 1 && $($(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForInGen = $forIn(1 && $($(1)));
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
let a = { a: 999, b: 1000 };
let tmpCalleeParam = 1;
if (tmpCalleeParam) {
  const tmpCalleeParam$1 = $(1);
  tmpCalleeParam = $(tmpCalleeParam$1);
} else {
}
let tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let x = tmpForInNext.value;
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpClusterSSA_tmpForInGen /*:unknown*/ = $forIn(tmpClusterSSA_tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpClusterSSA_tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForInNext.value;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
const c = $forIn( b );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = c.next();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    d.value;
  }
}
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next
- Calling a static method on an ident that is not global and not recorded: $tmpClusterSSA_tmpForInGen_next