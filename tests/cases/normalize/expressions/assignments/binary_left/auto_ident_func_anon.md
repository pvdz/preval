# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Assignments > Binary left > Auto ident func anon
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = function () {}) + $(100));
$(a);
`````


## Settled


`````js filename=intro
const a /*:()=>undefined*/ = function () {
  debugger;
  return undefined;
};
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = a + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = function () {};
$(a + $(100));
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
const b = $( 100 );
const c = a + b;
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
const tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 'function() {return undefined;}100'
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
