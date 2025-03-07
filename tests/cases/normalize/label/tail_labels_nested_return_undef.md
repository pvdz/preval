# Preval test case

# tail_labels_nested_return_undef.md

> Normalize > Label > Tail labels nested return undef
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
}
f();
`````

## Settled


`````js filename=intro
$(true);
$(true);
$(`before`);
$(`inside`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(true);
$(`before`);
$(`inside`);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(`before`);
  foo: {
    $(`inside`);
    if (x) if (y) break foo;
  }
};
const x = $(true);
const y = $(true);
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(`before`);
  $(`inside`);
  return undefined;
};
const x = $(true);
const y = $(true);
f();
`````

## PST Settled
With rename=true

`````js filename=intro
$( true );
$( true );
$( "before" );
$( "inside" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: true
 - 3: 'before'
 - 4: 'inside'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
