# Preval test case

# tail_labels_return_undef.md

> Normalize > Label > Tail labels return undef
>
>

## Input

`````js filename=intro
const x = $(true);
function f() {
  $('before');
  foo: {
    $('inside');
    if (x) $('ok?');
    break foo;
  }
}
f();
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
$(`before`);
$(`inside`);
if (x) {
  $(`ok?`);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(true);
$(`before`);
$(`inside`);
if (x) {
  $(`ok?`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
$( "before" );
$( "inside" );
if (a) {
  $( "ok?" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'before'
 - 3: 'inside'
 - 4: 'ok?'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
