# Preval test case

# identity.md

> Tofix > Identity
>
> The triple eq identity check can resolve for an ident on itself
> And let's face it. The whole example should be collapsed.
> The <= 0 check can also be inferred to be true.
> What about NaN tho? (And document.all kinds of cases)

## Input

`````js filename=intro
let tmpSwitchCaseToStart = 1;
let tmpIfTest$1 = true;
const tmpIfTest = $ === $; // Should eliminate this one but it won't
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
}
if (tmpIfTest$1) {
  try {
    $(x, 1);
  } catch ($finalImplicit) {}
  $(2);
} else {
  $(`oops`);
}
$(3);
`````

## Pre Normal


`````js filename=intro
let tmpSwitchCaseToStart = 1;
let tmpIfTest$1 = true;
const tmpIfTest = $ === $;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
}
if (tmpIfTest$1) {
  try {
    $(x, 1);
  } catch ($finalImplicit) {}
  $(2);
} else {
  $(`oops`);
}
$(3);
`````

## Normalized


`````js filename=intro
let tmpSwitchCaseToStart = 1;
let tmpIfTest$1 = true;
const tmpIfTest = $ === $;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
}
if (tmpIfTest$1) {
  try {
    $(x, 1);
  } catch ($finalImplicit) {}
  $(2);
} else {
  $(`oops`);
}
$(3);
`````

## Output


`````js filename=intro
const tmpIfTest = $ === $;
if (tmpIfTest) {
  try {
    $(x, 1);
  } catch ($finalImplicit) {}
  $(2);
} else {
  $(`oops`);
}
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $ === $;
if (a) {
  try {
    $( x, 1 );
  }
  catch (b) {

  }
  $( 2 );
}
else {
  $( "oops" );
}
$( 3 );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: 2
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
