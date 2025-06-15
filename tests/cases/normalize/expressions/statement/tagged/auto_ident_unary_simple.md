# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident unary simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$`before ${typeof x} after`;
$(a, x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`before `, ` after`];
$(tmpCalleeParam, `number`);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`before `, ` after`], `number`);
$({ a: 999, b: 1000 }, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
$( a, "number" );
const b = {
  a: 999,
  b: 1000,
};
$( b, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = [`before `, ` after`];
let tmpCalleeParam$1 = typeof x;
$(tmpCalleeParam, tmpCalleeParam$1);
$(a, x);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['before ', ' after'], 'number'
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
