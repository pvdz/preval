# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Tagged > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$`before ${$({ a: 1, b: 2 })} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:object*/ /*truthy*/ = { a: 1, b: 2 };
const tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$3);
const tmpCalleeParam /*:array*/ /*truthy*/ = [`before `, ` after`];
$(tmpCalleeParam, tmpCalleeParam$1);
$(999);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $({ a: 1, b: 2 });
$([`before `, ` after`], tmpCalleeParam$1);
$(999);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
const c = [ "before ", " after" ];
$( c, b );
$( 999 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpBindingPatternObjRoot = { a: 999, b: 1000 };
let a = tmpBindingPatternObjRoot.a;
let tmpCalleeParam = [`before `, ` after`];
let tmpCalleeParam$3 = { a: 1, b: 2 };
let tmpCalleeParam$1 = $(tmpCalleeParam$3);
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: ['before ', ' after'], { a: '1', b: '2' }
 - 3: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
