# Preval test case

# auto_ident_delete_computed_simple_simple.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident delete computed simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete arg["y"]) && (a = delete arg["y"]));
$(a, arg);
`````


## Settled


`````js filename=intro
const arg /*:object*/ /*truthy*/ = { y: 1 };
const a /*:boolean*/ = delete arg.y;
if (a) {
  const tmpNestedComplexRhs /*:boolean*/ = delete arg.y;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, arg);
} else {
  $(false);
  $(false, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
if (delete arg.y) {
  const tmpNestedComplexRhs = delete arg.y;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, arg);
} else {
  $(false);
  $(false, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = delete a.y;
if (b) {
  const c = delete a.y;
  $( c );
  $( c, a );
}
else {
  $( false );
  $( false, a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
a = delete arg.y;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpNestedComplexRhs = delete arg.y;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, arg);
} else {
  $(tmpCalleeParam);
  $(a, arg);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
