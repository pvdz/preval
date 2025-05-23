# Preval test case

# closure_bug.md

> Ref tracking > Closure bug

This tripped an ASSERT at some point because of code predating ref tracking

## Input

`````js filename=intro
let x = $;
if ($) {

} else {
  x = {};
}
x = $(1);
$(x.headers);
const f = function() {
  $(x);
};
$(f);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const tmpCalleeParam /*:unknown*/ = x.headers;
$(tmpCalleeParam);
const f /*:()=>undefined*/ = function () {
  debugger;
  $(x);
  return undefined;
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
$(x.headers);
$(function () {
  $(x);
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = a.headers;
$( b );
const c = function() {
  debugger;
  $( a );
  return undefined;
};
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $;
if ($) {
} else {
  x = {};
}
x = $(1);
let tmpCalleeParam = x.headers;
$(tmpCalleeParam);
const f = function () {
  debugger;
  $(x);
  return undefined;
};
$(f);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
