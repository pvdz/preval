# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Arr spread > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
[...(b = $(2))];
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:unknown*/ = $(2);
[...b];
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = $(2);
[...b];
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
[ ...a ];
const b = {
  a: 999,
  b: 1000,
};
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = $(2);
const tmpArrElToSpread = b;
[...tmpArrElToSpread];
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
