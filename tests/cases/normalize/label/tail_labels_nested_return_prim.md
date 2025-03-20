# Preval test case

# tail_labels_nested_return_prim.md

> Normalize > Label > Tail labels nested return prim
>
>

## Input

`````js filename=intro
const x = $(true);
const y = $(true);
function f() {
  $('before');
  const xy = x + y;
  foo: { 
    $('inside'); 
    if (x) 
      if (y)
        break foo;
  }
  return xy;
}
$(f());
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
const y /*:unknown*/ = $(true);
$(`before`);
const xy /*:primitive*/ = x + y;
$(`inside`);
$(xy);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(true);
const y = $(true);
$(`before`);
const xy = x + y;
$(`inside`);
$(xy);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = $( true );
$( "before" );
const c = a + b;
$( "inside" );
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: 'before'
 - 4: 'inside'
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
