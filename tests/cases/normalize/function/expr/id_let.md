# Preval test case

# id_let.md

> Normalize > Function > Expr > Id let
>
> Function recursion by referencing a function expr id

## Input

`````js filename=intro
let f = function findme() {
  $(typeof findme);
  return findme;
};
const x = f();
$(x, typeof f);
`````


## Settled


`````js filename=intro
const findme /*:()=>unknown*/ = function () {
  debugger;
  $(`function`);
  return findme;
};
$(`function`);
$(findme, `function`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const findme = function () {
  $(`function`);
  return findme;
};
$(`function`);
$(findme, `function`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "function" );
  return a;
};
$( "function" );
$( a, "function" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const findme = function () {
  debugger;
  let tmpCalleeParam = typeof findme;
  $(tmpCalleeParam);
  return findme;
};
let f = findme;
const x = findme();
let tmpCalleeParam$1 = x;
let tmpCalleeParam$3 = typeof f;
$(tmpCalleeParam$1, tmpCalleeParam$3);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'function'
 - 2: '<function>', 'function'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
