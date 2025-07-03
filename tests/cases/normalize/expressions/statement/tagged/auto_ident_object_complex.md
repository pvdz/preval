# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Statement > Tagged > Auto ident object complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${{ x: $(1), y: 2, z: $(3) }} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const tmpObjLitVal$3 /*:unknown*/ = $(3);
const tmpCalleeParam /*:array*/ /*truthy*/ = [`before `, ` after`];
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
$(tmpCalleeParam, tmpCalleeParam$1);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$3 = $(3);
$([`before `, ` after`], { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 });
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = [ "before ", " after" ];
const d = {
  x: a,
  y: 2,
  z: b,
};
$( c, d );
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = [`before `, ` after`];
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$3 = $(3);
let tmpCalleeParam$1 = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````


## Todos triggered


- (todo) array reads var statement with init ObjectExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: ['before ', ' after'], { x: '1', y: '2', z: '3' }
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
