# Preval test case

# base_ident_call_closure.md

> Function trampoline > Call return > Base ident call closure
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const f = function() {
  const g = function(a) {
    $('do');
    $('not');
    $('inline');
    const r = $(a);
    return r;
  };
  const h = function(){
    g(1);
  };
  const q = h(); // In this test, this is the call we expect to be replaced by trampoline inlining...
  $(q);
};
f();
`````


## Settled


`````js filename=intro
$(`do`);
$(`not`);
$(`inline`);
$(1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`do`);
$(`not`);
$(`inline`);
$(1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "do" );
$( "not" );
$( "inline" );
$( 1 );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'do'
 - 2: 'not'
 - 3: 'inline'
 - 4: 1
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
