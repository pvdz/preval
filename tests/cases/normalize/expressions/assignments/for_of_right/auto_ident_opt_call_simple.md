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
const tmpIfTest /*:boolean*/ = $ == null;
let tmpForOfGenNext /*:unknown*/ = undefined;
if (tmpIfTest) {
  tmpForOfGenNext = $forOf(undefined);
} else {
  a = $(1);
  tmpForOfGenNext = $forOf(a);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
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
const tmpIfTest = $ == null;
let tmpForOfGenNext = undefined;
if (tmpIfTest) {
  tmpForOfGenNext = $forOf(undefined);
} else {
  a = $(1);
  tmpForOfGenNext = $forOf(a);
}
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
let c = undefined;
if (b) {
  c = $forOf( undefined );
}
else {
  a = $( 1 );
  c = $forOf( a );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = c();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    d.value;
  }
}
$( a );
`````


## Todos triggered


None


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
