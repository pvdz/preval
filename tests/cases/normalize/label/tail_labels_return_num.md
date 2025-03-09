# Preval test case

# tail_labels_return_num.md

> Normalize > Label > Tail labels return num
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
  return 500;
}
$(f());
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
$(`before`);
$(`inside`);
if (x) {
  $(`ok?`);
  $(500);
} else {
  $(500);
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
  $(500);
} else {
  $(500);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(`before`);
  foo: {
    $(`inside`);
    if (x) $(`ok?`);
    break foo;
  }
  return 500;
};
const x = $(true);
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(`before`);
  $(`inside`);
  if (x) {
    $(`ok?`);
    return 500;
  } else {
    return 500;
  }
};
const x = $(true);
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
$( "before" );
$( "inside" );
if (a) {
  $( "ok?" );
  $( 500 );
}
else {
  $( 500 );
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
 - 5: 500
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
