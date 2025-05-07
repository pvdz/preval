# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Statement > Tagged > Auto ident obj pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$`before ${({ x, y } = { x: $(3), y: $(4) })} after`;
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(3);
const tmpObjLitVal$1 /*:unknown*/ = $(4);
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
const tmpNestedAssignObjPatternRhs /*:object*/ = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
$(tmpCalleeParam, tmpNestedAssignObjPatternRhs);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpObjLitVal, tmpObjLitVal$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
$([`before `, ` after`], { x: tmpObjLitVal, y: tmpObjLitVal$1 });
$({ a: 999, b: 1000 }, tmpObjLitVal, tmpObjLitVal$1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
const c = [ "before ", " after" ];
const d = {
  x: a,
  y: b,
};
$( c, d );
const e = {
  a: 999,
  b: 1000,
};
$( e, a, b );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: ['before ', ' after'], { x: '3', y: '4' }
 - 4: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
