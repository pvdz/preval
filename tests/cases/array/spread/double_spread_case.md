# Preval test case

# double_spread_case.md

> Array > Spread > Double spread case
>
> Spreading an array into another array that is assigned to a binding

A double spread has the danger of the first case messing with indexes for the second case.

The spreads must be resolved in a first step, back to front, and injections should happen in a second step, also back to front.

## Input

`````js filename=intro
let a = $('x')
let b = $('y')
const x = [a, a, a, a, 2, 3];
a = $('u')
b = $('w')
const y = [1, b, a, a, b, 3];
a = $('o')
b = $('p')
const aa = ['a', ...x, ...y, 'a'];
const zz = ['z', ...y, ...x, 'z'];
$(aa, zz, a, b);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(`x`);
$(`y`);
const tmpClusterSSA_a /*:unknown*/ = $(`u`);
const b /*:unknown*/ = $(`w`);
const tmpClusterSSA_a$1 /*:unknown*/ = $(`o`);
const tmpClusterSSA_b /*:unknown*/ = $(`p`);
const aa /*:array*/ /*truthy*/ = [`a`, a, a, a, a, 2, 3, 1, b, tmpClusterSSA_a, tmpClusterSSA_a, b, 3, `a`];
const zz /*:array*/ /*truthy*/ = [`z`, 1, b, tmpClusterSSA_a, tmpClusterSSA_a, b, 3, a, a, a, a, 2, 3, `z`];
$(aa, zz, tmpClusterSSA_a$1, tmpClusterSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(`x`);
$(`y`);
const tmpClusterSSA_a = $(`u`);
const b = $(`w`);
const tmpClusterSSA_a$1 = $(`o`);
const tmpClusterSSA_b = $(`p`);
$(
  [`a`, a, a, a, a, 2, 3, 1, b, tmpClusterSSA_a, tmpClusterSSA_a, b, 3, `a`],
  [`z`, 1, b, tmpClusterSSA_a, tmpClusterSSA_a, b, 3, a, a, a, a, 2, 3, `z`],
  tmpClusterSSA_a$1,
  tmpClusterSSA_b,
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "x" );
$( "y" );
const b = $( "u" );
const c = $( "w" );
const d = $( "o" );
const e = $( "p" );
const f = [ "a", a, a, a, a, 2, 3, 1, c, b, b, c, 3, "a" ];
const g = [ "z", 1, c, b, b, c, 3, a, a, a, a, 2, 3, "z" ];
$( f, g, d, e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = $(`x`);
let b = $(`y`);
const x = [a, a, a, a, 2, 3];
a = $(`u`);
b = $(`w`);
const y = [1, b, a, a, b, 3];
a = $(`o`);
b = $(`p`);
const aa = [`a`, ...x, ...y, `a`];
const zz = [`z`, ...y, ...x, `z`];
$(aa, zz, a, b);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - 2: 'y'
 - 3: 'u'
 - 4: 'w'
 - 5: 'o'
 - 6: 'p'
 - 7: ['a', 'x', 'x', 'x', 'x', 2, 3, 1, 'w', 'u', 'u', 'w', 3, 'a'], ['z', 1, 'w', 'u', 'u', 'w', 3, 'x', 'x', 'x', 'x', 2, 3, 'z'], 'o', 'p'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
