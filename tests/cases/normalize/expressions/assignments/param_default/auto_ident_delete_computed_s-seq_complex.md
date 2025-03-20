# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident delete computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
function f(p = (a = delete ($(1), $(2), arg)[$("y")])) {}
$(f());
$(a, arg);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ = { y: 1 };
const tmpNestedComplexRhs /*:boolean*/ = delete arg[tmpDeleteCompProp];
$(undefined);
$(tmpNestedComplexRhs, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
const tmpNestedComplexRhs = delete arg[tmpDeleteCompProp];
$(undefined);
$(tmpNestedComplexRhs, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( "y" );
const b = { y: 1 };
const c = delete b[ a ];
$( undefined );
$( c, b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'y'
 - 4: undefined
 - 5: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
