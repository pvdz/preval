# Preval test case

# setting_false_when_false_is_known.md

> Type tracked > Setting false when false is known
>
> When setting a binding to a value that we can already infer, we can forgo the assignment

## Input

`````js filename=intro
let tmpIfTest$1917 = $('is') === 67636;
if (tmpIfTest$1917) {
  $('it was')
}
else {
  tmpIfTest$1917 = false; // redundant
  $('it was not')
}
`````

## Settled


`````js filename=intro
const tmpBinLhs /*:unknown*/ = $(`is`);
const tmpIfTest$1917 /*:boolean*/ = tmpBinLhs === 67636;
if (tmpIfTest$1917) {
  $(`it was`);
} else {
  $(`it was not`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`is`) === 67636) {
  $(`it was`);
} else {
  $(`it was not`);
}
`````

## Pre Normal


`````js filename=intro
let tmpIfTest$1917 = $(`is`) === 67636;
if (tmpIfTest$1917) {
  $(`it was`);
} else {
  tmpIfTest$1917 = false;
  $(`it was not`);
}
`````

## Normalized


`````js filename=intro
const tmpBinLhs = $(`is`);
let tmpIfTest$1917 = tmpBinLhs === 67636;
if (tmpIfTest$1917) {
  $(`it was`);
} else {
  tmpIfTest$1917 = false;
  $(`it was not`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "is" );
const b = a === 67636;
if (b) {
  $( "it was" );
}
else {
  $( "it was not" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'is'
 - 2: 'it was not'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
