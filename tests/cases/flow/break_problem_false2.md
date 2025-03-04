# Preval test case

# break_problem_false2.md

> Flow > Break problem false2
>
> Must track all labeled breaks when checking if a binding is mutated

## Input

`````js filename=intro
const tmpLabeledBlockFunc = function () {
  debugger;
  const tmpIfTest$3 = $(false);
  if (tmpIfTest$3) {
    $('fail');
    return undefined;
  } else {
    $('pass');
    return undefined;
  }
  $('pass');
  return undefined;
};
tmpLabeledBlockFunc();
`````

## Pre Normal


`````js filename=intro
const tmpLabeledBlockFunc = function () {
  debugger;
  const tmpIfTest$3 = $(false);
  if (tmpIfTest$3) {
    $(`fail`);
    return undefined;
  } else {
    $(`pass`);
    return undefined;
  }
  $(`pass`);
  return undefined;
};
tmpLabeledBlockFunc();
`````

## Normalized


`````js filename=intro
const tmpLabeledBlockFunc = function () {
  debugger;
  const tmpIfTest$3 = $(false);
  if (tmpIfTest$3) {
    $(`fail`);
    return undefined;
  } else {
    $(`pass`);
    return undefined;
  }
};
tmpLabeledBlockFunc();
`````

## Output


`````js filename=intro
const tmpIfTest$3 /*:unknown*/ = $(false);
if (tmpIfTest$3) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  $( "fail" );
}
else {
  $( "pass" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
