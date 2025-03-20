# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Assignments > For in right > Auto ident obj pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

## Options

Known TDZ problem

- skipEval
- globals: x$1

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (let x in (a = { x, y } = ($(x), $(y), { x: $(3), y: $(4) })));
$(a, x, y);
`````


## Settled


`````js filename=intro
$(x$1);
$(2);
const tmpObjLitVal /*:unknown*/ = $(3);
const tmpObjLitVal$1 /*:unknown*/ = $(4);
x$1 = tmpObjLitVal;
const tmpNestedAssignObjPatternRhs /*:object*/ = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
const tmpForInGen /*:unknown*/ = $forIn(tmpNestedAssignObjPatternRhs);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForInNext.value;
  }
}
$(tmpNestedAssignObjPatternRhs, 1, tmpObjLitVal$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(x$1);
$(2);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
x$1 = tmpObjLitVal;
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
const tmpForInGen = $forIn(tmpNestedAssignObjPatternRhs);
while (true) {
  const tmpForInNext = tmpForInGen.next();
  if (tmpForInNext.done) {
    break;
  } else {
    tmpForInNext.value;
  }
}
$(tmpNestedAssignObjPatternRhs, 1, tmpObjLitVal$1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( x$1 );
$( 2 );
const a = $( 3 );
const b = $( 4 );
x$1 = a;
const c = {
  x: a,
  y: b,
};
const d = $forIn( c );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = d.next();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    e.value;
  }
}
$( c, 1, b );
`````


## Todos triggered


- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
