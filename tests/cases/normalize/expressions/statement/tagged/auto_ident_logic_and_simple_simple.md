# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident logic and simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${1 && 2} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, 2);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`before `, ` after`], 2);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
$( a, 2 );
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['before ', ' after'], 2
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
