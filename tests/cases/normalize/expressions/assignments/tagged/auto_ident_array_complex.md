# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident array complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = [$(1), 2, $(3)])} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(1);
const tmpArrElement$3 /*:unknown*/ = $(3);
const tmpCalleeParam /*:array*/ /*truthy*/ = [`before `, ` after`];
const a /*:array*/ /*truthy*/ = [tmpArrElement, 2, tmpArrElement$3];
$(tmpCalleeParam, a);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const tmpCalleeParam = [`before `, ` after`];
const a = [tmpArrElement, 2, tmpArrElement$3];
$(tmpCalleeParam, a);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = [ "before ", " after" ];
const d = [ a, 2, b ];
$( c, d );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = [`before `, ` after`];
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
a = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
$(a);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 
  ['before ', ' after'],
  [1, 2, 3],

 - 4: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
