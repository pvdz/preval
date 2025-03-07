# Preval test case

# decl_after.md

> Normalize > Dce > Break > Decl after
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

## Input

`````js filename=intro
while ($(true)) {
  if ($(false)) x = $('fail too');
  break;
  
  let x = $('fail (dead code)');
}
$('after');
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(false);
  if (tmpIfTest$1) {
    $(`fail too`);
    throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
  } else {
  }
} else {
}
$(`after`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  if ($(false)) {
    $(`fail too`);
    throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
  }
}
$(`after`);
`````

## Pre Normal


`````js filename=intro
while ($(true)) {
  if ($(false)) $(`fail too`), $throwTDZError(`Preval: TDZ triggered for this assignment: x = \$('fail too')`);
  break;
  let x = $(`fail (dead code)`);
}
$(`after`);
`````

## Normalized


`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(false);
    if (tmpIfTest$1) {
      $(`fail too`);
      throw `Preval: TDZ triggered for this assignment: x = \$('fail too')`;
    } else {
      break;
      let x = $(`fail (dead code)`);
    }
  } else {
    break;
  }
}
$(`after`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( false );
  if (b) {
    $( "fail too" );
    throw "Preval: TDZ triggered for this assignment: x = $('fail too')";
  }
}
$( "after" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: false
 - 3: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
