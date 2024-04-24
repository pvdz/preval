# Preval test case

# setting_false_when_false_is_known.md

> Type tracked > Setting false when false is known
>
> When setting a binding to a value that we can already infer, we can forgo the assignment

#TODO

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

## Output

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

## PST Output

With rename=true

`````js filename=intro
const a = $( "is" );
let b = a === 67636;
if (b) {
  $( "it was" );
}
else {
  b = false;
  $( "it was not" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'is'
 - 2: 'it was not'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
