# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident cond s-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(10, 20, 30) ? $(2) : $($(100))} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(2);
const tmpCalleeParam /*:array*/ /*truthy*/ = [`before `, ` after`];
$(tmpCalleeParam, tmpClusterSSA_tmpCalleeParam$1);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpCalleeParam$1 = $(2);
$([`before `, ` after`], tmpClusterSSA_tmpCalleeParam$1);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ "before ", " after" ];
$( b, a );
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = [`before `, ` after`];
let tmpCalleeParam$1 = undefined;
const tmpIfTest = 30;
if (tmpIfTest) {
  tmpCalleeParam$1 = $(2);
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
 - 1: 2
 - 2: ['before ', ' after'], 2
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
