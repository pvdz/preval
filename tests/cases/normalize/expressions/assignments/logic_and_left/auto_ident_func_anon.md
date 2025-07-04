# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Assignments > Logic and left > Auto ident func anon
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = function () {}) && $(100));
$(a);
`````


## Settled


`````js filename=intro
const a /*:()=>undefined*/ = function $pcompiled() {
  debugger;
  return undefined;
};
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
$(tmpClusterSSA_tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = function $pcompiled() {};
$($(100));
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  return undefined;
};
const c = $( 100 );
$( c );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = function () {
  debugger;
  return undefined;
};
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a);
} else {
  $(tmpCalleeParam);
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
