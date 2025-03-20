# Preval test case

# base_ident_call_closure.md

> Function trampoline > Call only > Base ident call closure
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const f = function() {
  const g = function(a) {
    $('do');
    $('not');
    $('inline');
    $(a);
  };
  const h = function(){
    g(1);
  };
  h(); // In this test, this is the call we expect to be replaced by trampoline inlining...
};
f();
`````


## Settled


`````js filename=intro
$(`do`);
$(`not`);
$(`inline`);
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`do`);
$(`not`);
$(`inline`);
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "do" );
$( "not" );
$( "inline" );
$( 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'do'
 - 2: 'not'
 - 3: 'inline'
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
