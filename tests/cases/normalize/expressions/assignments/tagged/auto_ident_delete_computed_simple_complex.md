# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident delete computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$`before ${(a = delete arg[$("y")])} after`;
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ = { y: 1 };
const a /*:boolean*/ = delete arg[tmpDeleteCompProp];
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, a);
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
const a = delete arg[tmpDeleteCompProp];
$([`before `, ` after`], a);
$(a, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "y" );
const b = { y: 1 };
const c = delete b[ a ];
const d = [ "before ", " after" ];
$( d, c );
$( c, b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'y'
 - 2: ['before ', ' after'], true
 - 3: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
