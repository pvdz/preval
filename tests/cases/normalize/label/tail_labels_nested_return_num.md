# Preval test case

# tail_labels_nested_return_num.md

> Normalize > Label > Tail labels nested return num
>
>

## Input

`````js filename=intro
const x = $(true);
const y = $(true);
function f() {
  $('before');
  foo: { 
    $('inside'); 
    if (x) 
      if (y)
        break foo;
  }
  return 500;
}
$(f());
`````


## Settled


`````js filename=intro
$(true);
$(true);
$(`before`);
$(`inside`);
$(500);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(true);
$(`before`);
$(`inside`);
$(500);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( true );
$( "before" );
$( "inside" );
$( 500 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  foo: {
    $(`before`);
    $(`inside`);
    if (x) {
      if (y) {
        break foo;
      } else {
      }
    } else {
    }
  }
  return 500;
};
const x = $(true);
const y = $(true);
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - 3: 'before'
 - 4: 'inside'
 - 5: 500
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
