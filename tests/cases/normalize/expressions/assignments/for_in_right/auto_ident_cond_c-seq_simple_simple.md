# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Assignments > For in right > Auto ident cond c-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = (10, 20, $(30)) ? $(2) : $($(100))));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(30);
let tmpForInGen /*:unknown*/ = undefined;
if (tmpIfTest) {
  a = $(2);
  tmpForInGen = $forIn(a);
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
let a = undefined;
const tmpIfTest = $(30);
let tmpForInGen = undefined;
if (tmpIfTest) {
  a = $(2);
  tmpForInGen = $forIn(a);
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


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 30 );
let c = undefined;
if (b) {
  a = $( 2 );
  c = $forIn( a );
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


## Todos triggered


- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
