# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > For of right > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = "foo"));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForOfGen = $forOf((a = `foo`));
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
const tmpCallCallee = $forOf;
a = `foo`;
let tmpCalleeParam = a;
let tmpForOfGen = tmpCallCallee(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let x = tmpForOfNext.value;
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpForOfGen /*:unknown*/ = $forOf(`foo`);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(`foo`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $forOf( "foo" );
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
$( "foo" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
