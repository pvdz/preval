# Preval test case

# noobs_between.md

> Const promotion > Noobs between
>
> A let decl with assignment later can be transformed if there are only statements in between with no observable side effects.

## Input

`````js filename=intro
let x = $(10);
var a = function(){ return x; }; // Closure, making trivial analysis harder
a = 2;
x = $(20);
$(x, a, 'final');
`````


## Settled


`````js filename=intro
$(10);
const x /*:unknown*/ = $(20);
$(x, 2, `final`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
$($(20), 2, `final`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
const a = $( 20 );
$( a, 2, "final" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let x = $(10);
a = function () {
  debugger;
  return x;
};
a = 2;
x = $(20);
$(x, a, `final`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 20, 2, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
