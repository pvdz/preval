# Preval test case

# transitivity.md

> Primitive arg inlining > Transitivity
>
> Trying to proc the cloning cache

## Input

`````js filename=intro
function f(a, b) {
  return $(a, b);
}
$(f('a', $('b')), 'first A');
$(f($('a'), 'b'), 'first B');
$(f($('a'), $('b')), 'first C');
$(f('a', 'b'), 'first D');
$(f('a', $('b')), 'second A');
$(f($('a'), 'b'), 'second B');
$(f($('a'), $('b')), 'second C');
$(f('a', 'b'), 'second D');
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(`b`);
const tmpCalleeParam /*:unknown*/ = $(`a`, tmpCalleeParam$1);
$(tmpCalleeParam, `first A`);
const tmpCalleeParam$5 /*:unknown*/ = $(`a`);
const tmpCalleeParam$3 /*:unknown*/ = $(tmpCalleeParam$5, `b`);
$(tmpCalleeParam$3, `first B`);
const tmpCalleeParam$9 /*:unknown*/ = $(`a`);
const tmpCalleeParam$11 /*:unknown*/ = $(`b`);
const tmpCalleeParam$7 /*:unknown*/ = $(tmpCalleeParam$9, tmpCalleeParam$11);
$(tmpCalleeParam$7, `first C`);
const tmpCalleeParam$13 /*:unknown*/ = $(`a`, `b`);
$(tmpCalleeParam$13, `first D`);
const tmpCalleeParam$17 /*:unknown*/ = $(`b`);
const tmpCalleeParam$15 /*:unknown*/ = $(`a`, tmpCalleeParam$17);
$(tmpCalleeParam$15, `second A`);
const tmpCalleeParam$21 /*:unknown*/ = $(`a`);
const tmpCalleeParam$19 /*:unknown*/ = $(tmpCalleeParam$21, `b`);
$(tmpCalleeParam$19, `second B`);
const tmpCalleeParam$25 /*:unknown*/ = $(`a`);
const tmpCalleeParam$27 /*:unknown*/ = $(`b`);
const tmpCalleeParam$23 /*:unknown*/ = $(tmpCalleeParam$25, tmpCalleeParam$27);
$(tmpCalleeParam$23, `second C`);
const tmpCalleeParam$29 /*:unknown*/ = $(`a`, `b`);
$(tmpCalleeParam$29, `second D`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`a`, $(`b`)), `first A`);
$($($(`a`), `b`), `first B`);
const tmpCalleeParam$9 = $(`a`);
$($(tmpCalleeParam$9, $(`b`)), `first C`);
$($(`a`, `b`), `first D`);
$($(`a`, $(`b`)), `second A`);
$($($(`a`), `b`), `second B`);
const tmpCalleeParam$25 = $(`a`);
$($(tmpCalleeParam$25, $(`b`)), `second C`);
$($(`a`, `b`), `second D`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "b" );
const b = $( "a", a );
$( b, "first A" );
const c = $( "a" );
const d = $( c, "b" );
$( d, "first B" );
const e = $( "a" );
const f = $( "b" );
const g = $( e, f );
$( g, "first C" );
const h = $( "a", "b" );
$( h, "first D" );
const i = $( "b" );
const j = $( "a", i );
$( j, "second A" );
const k = $( "a" );
const l = $( k, "b" );
$( l, "second B" );
const m = $( "a" );
const n = $( "b" );
const o = $( m, n );
$( o, "second C" );
const p = $( "a", "b" );
$( p, "second D" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'b'
 - 2: 'a', 'b'
 - 3: 'a', 'first A'
 - 4: 'a'
 - 5: 'a', 'b'
 - 6: 'a', 'first B'
 - 7: 'a'
 - 8: 'b'
 - 9: 'a', 'b'
 - 10: 'a', 'first C'
 - 11: 'a', 'b'
 - 12: 'a', 'first D'
 - 13: 'b'
 - 14: 'a', 'b'
 - 15: 'a', 'second A'
 - 16: 'a'
 - 17: 'a', 'b'
 - 18: 'a', 'second B'
 - 19: 'a'
 - 20: 'b'
 - 21: 'a', 'b'
 - 22: 'a', 'second C'
 - 23: 'a', 'b'
 - 24: 'a', 'second D'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
