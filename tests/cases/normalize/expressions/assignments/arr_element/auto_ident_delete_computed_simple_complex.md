# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident delete computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete arg[$("y")]) + (a = delete arg[$("y")]));
$(a, arg);
`````

## Settled


`````js filename=intro
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ = { y: 1 };
const a /*:boolean*/ = delete arg[tmpDeleteCompProp];
const tmpDeleteCompProp$1 /*:unknown*/ = $(`y`);
const tmpClusterSSA_a /*:boolean*/ = delete arg[tmpDeleteCompProp$1];
const tmpCalleeParam /*:number*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a, arg);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
const a = delete arg[tmpDeleteCompProp];
const tmpDeleteCompProp$1 = $(`y`);
const tmpClusterSSA_a = delete arg[tmpDeleteCompProp$1];
$(a + tmpClusterSSA_a);
$(tmpClusterSSA_a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$((a = delete arg[$(`y`)]) + (a = delete arg[$(`y`)]));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $(`y`);
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpBinBothLhs = a;
const tmpDeleteCompObj$1 = arg;
const tmpDeleteCompProp$1 = $(`y`);
a = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "y" );
const b = { y: 1 };
const c = delete b[ a ];
const d = $( "y" );
const e = delete b[ d ];
const f = c + e;
$( f );
$( e, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'y'
 - 2: 'y'
 - 3: 2
 - 4: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
