# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident delete computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete arg[$("y")]) || (a = delete arg[$("y")]));
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ = { y: 1 };
const a /*:boolean*/ = delete arg[tmpDeleteCompProp];
if (a) {
  $(true);
  $(true, arg);
} else {
  const tmpDeleteCompProp$1 /*:unknown*/ = $(`y`);
  const tmpNestedComplexRhs /*:boolean*/ = delete arg[tmpDeleteCompProp$1];
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
if (delete arg[tmpDeleteCompProp]) {
  $(true);
  $(true, arg);
} else {
  const tmpDeleteCompProp$1 = $(`y`);
  const tmpNestedComplexRhs = delete arg[tmpDeleteCompProp$1];
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "y" );
const b = { y: 1 };
const c = delete b[ a ];
if (c) {
  $( true );
  $( true, b );
}
else {
  const d = $( "y" );
  const e = delete b[ d ];
  $( e );
  $( e, b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'y'
 - 2: true
 - 3: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
