# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident delete computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(
  (a = delete ($(1), $(2), arg)[$("y")]) &&
    (a = delete ($(1), $(2), arg)[$("y")])
);
$(a, arg);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ = { y: 1 };
const a /*:boolean*/ = delete arg[tmpDeleteCompProp];
if (a) {
  $(1);
  $(2);
  const tmpDeleteCompProp$1 /*:unknown*/ = $(`y`);
  const tmpNestedComplexRhs /*:boolean*/ = delete arg[tmpDeleteCompProp$1];
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
$(1);
$(2);
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
if (delete arg[tmpDeleteCompProp]) {
  $(1);
  $(2);
  const tmpDeleteCompProp$1 = $(`y`);
  const tmpNestedComplexRhs = delete arg[tmpDeleteCompProp$1];
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
$( 1 );
$( 2 );
const a = $( "y" );
const b = { y: 1 };
const c = delete b[ a ];
if (c) {
  $( 1 );
  $( 2 );
  const d = $( "y" );
  const e = delete b[ d ];
  $( e );
  $( e, b );
}
else {
  $( false );
  $( false, b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'y'
 - 4: 1
 - 5: 2
 - 6: 'y'
 - 7: true
 - 8: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
