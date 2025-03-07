# Preval test case

# eh_bool_true.md

> If flipping > Eh bool true
>
> An if-test that is the result of a bool conversion should use the arg directly

## Input

`````js filename=intro
const y = $(1);
const x = Boolean(y);
if (x) $('then');
else $('else');
`````

## Settled


`````js filename=intro
const y /*:unknown*/ = $(1);
if (y) {
  $(`then`);
} else {
  $(`else`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(`then`);
} else {
  $(`else`);
}
`````

## Pre Normal


`````js filename=intro
const y = $(1);
const x = Boolean(y);
if (x) $(`then`);
else $(`else`);
`````

## Normalized


`````js filename=intro
const y = $(1);
const x = Boolean(y);
if (x) {
  $(`then`);
} else {
  $(`else`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( "then" );
}
else {
  $( "else" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 'then'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
