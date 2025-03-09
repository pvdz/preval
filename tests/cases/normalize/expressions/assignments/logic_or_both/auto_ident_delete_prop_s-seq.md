# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident delete prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete ($(1), $(2), arg).y) || (a = delete ($(1), $(2), arg).y));
$(a, arg);
`````

## Settled


`````js filename=intro
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
const a /*:boolean*/ = delete arg.y;
if (a) {
  $(true);
  $(true, arg);
} else {
  $(1);
  $(2);
  const tmpNestedComplexRhs /*:boolean*/ = delete arg.y;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, arg);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const arg = { y: 1 };
if (delete arg.y) {
  $(true);
  $(true, arg);
} else {
  $(1);
  $(2);
  const tmpNestedComplexRhs = delete arg.y;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, arg);
}
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$((a = delete ($(1), $(2), arg).y) || (a = delete ($(1), $(2), arg).y));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = arg;
a = delete tmpDeleteObj.y;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a, arg);
} else {
  $(1);
  $(2);
  const tmpDeleteObj$1 = arg;
  const tmpNestedComplexRhs = delete tmpDeleteObj$1.y;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, arg);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = { y: 1 };
const b = delete a.y;
if (b) {
  $( true );
  $( true, a );
}
else {
  $( 1 );
  $( 2 );
  const c = delete a.y;
  $( c );
  $( c, a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: true
 - 4: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
