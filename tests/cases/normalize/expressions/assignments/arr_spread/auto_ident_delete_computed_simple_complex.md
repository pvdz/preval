# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident delete computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$([...(a = delete arg[$("y")])]);
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ /*truthy*/ = { y: 1 };
const a /*:boolean*/ = delete arg[tmpDeleteCompProp];
const tmpCalleeParam /*:array*/ /*truthy*/ = [...a];
$(tmpCalleeParam);
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
const a = delete arg[tmpDeleteCompProp];
$([...a]);
$(a, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "y" );
const b = { y: 1 };
const c = delete b[ a ];
const d = [ ...c ];
$( d );
$( c, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $(`y`);
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
const tmpArrSpread = a;
let tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
$(a, arg);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'y'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
