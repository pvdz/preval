# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > For of right > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let x of (a = ($(1), $(2), $(x))));
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  let tmpForOfGen = $forOf((a = ($(1), $(2), $(x$1))));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      let x$1 = tmpForOfNext.value;
    }
  }
}
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $forOf;
$(1);
$(2);
a = $(x$1);
let tmpCalleeParam = a;
let tmpForOfGen = tmpCallCallee(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let x$2 = tmpForOfNext.value;
  }
}
$(a, x);
`````

## Output


`````js filename=intro
$(1);
$(2);
const a /*:unknown*/ = $(x$1);
const tmpForOfGen /*:unknown*/ = $forOf(a);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( x$1 );
const b = $forOf( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b.next();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    c.value;
  }
}
$( a, 1 );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x$1

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: BAD!?
 - 1: 1
 - 2: 2
 - eval returned: ('<crash[ <ref> is not defined ]>')

Final output calls: BAD!!
 - 1: 1
 - 2: 2
 - eval returned: ('<crash[ <ref> is not defined ]>')
