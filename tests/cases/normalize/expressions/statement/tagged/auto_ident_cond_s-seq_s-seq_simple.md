# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident cond s-seq s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(10, 20, 30) ? (40, 50, 60) : $($(100))} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`before `, ` after`];
$(tmpCalleeParam, 60);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`before `, ` after`], 60);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
$( a, 60 );
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = [`before `, ` after`];
let tmpCalleeParam$1 = undefined;
const tmpIfTest = 30;
if (tmpIfTest) {
  tmpCalleeParam$1 = 60;
  $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
} else {
  let tmpCalleeParam$3 = $(100);
  tmpCalleeParam$1 = $(tmpCalleeParam$3);
  $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
}
`````


## Todos triggered


- (todo) array reads var statement with init ObjectExpression
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['before ', ' after'], 60
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
