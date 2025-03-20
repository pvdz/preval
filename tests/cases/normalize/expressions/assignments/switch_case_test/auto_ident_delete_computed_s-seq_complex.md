# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident delete computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = delete ($(1), $(2), arg)[$("y")]):
}
$(a, arg);
`````


## Settled


`````js filename=intro
$(1);
$(1);
$(2);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ = { y: 1 };
const a /*:boolean*/ = delete arg[tmpDeleteCompProp];
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(1);
$(2);
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
$(delete arg[tmpDeleteCompProp], arg);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 1 );
$( 2 );
const a = $( "y" );
const b = { y: 1 };
const c = delete b[ a ];
$( c, b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 'y'
 - 5: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
