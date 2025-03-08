# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > For in right > Auto ident cond c-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = 60;
const tmpIfTest /*:unknown*/ = $(30);
let tmpForInGen /*:unknown*/ = undefined;
if (tmpIfTest) {
  tmpForInGen = $forIn(60);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  a = $(tmpCalleeParam$1);
  tmpForInGen = $forIn(a);
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
let a = 60;
const tmpIfTest = $(30);
let tmpForInGen = undefined;
if (tmpIfTest) {
  tmpForInGen = $forIn(60);
} else {
  a = $($(100));
  tmpForInGen = $forIn(a);
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
let a = { a: 999, b: 1000 };
{
  let tmpForInGen = $forIn((a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))));
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
const tmpIfTest = $(30);
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCalleeParam$1 = $(100);
  a = $(tmpCalleeParam$1);
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
let a = 60;
const b = $( 30 );
let c = undefined;
if (b) {
  c = $forIn( 60 );
}
else {
  const d = $( 100 );
  a = $( d );
  c = $forIn( a );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = c.next();
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
 - 1: 30
 - 2: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next