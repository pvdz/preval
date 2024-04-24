# Preval test case

# tdz.md

> If reduce up > Tdz
>
> Trivial case

#TODO

## Input

`````js filename=intro
let x = 0;
if (fail) { // We should guard to prevent this tdz error
  x = $('do not reach me');
} else {
  x = $('do not reach me');
}
$(x);
let fail = "too late";
`````

## Pre Normal

`````js filename=intro
let x = 0;
if ($throwTDZError(`TDZ triggered for this read: if (fail) {`)) {
  x = $(`do not reach me`);
} else {
  x = $(`do not reach me`);
}
$(x);
let fail = `too late`;
`````

## Normalized

`````js filename=intro
let x = 0;
const tmpIfTest = $throwTDZError(`TDZ triggered for this read: if (fail) {`);
if (tmpIfTest) {
  x = $(`do not reach me`);
} else {
  x = $(`do not reach me`);
}
$(x);
let fail = `too late`;
`````

## Output

`````js filename=intro
$throwTDZError(`TDZ triggered for this read: if (fail) {`);
const x = $(`do not reach me`);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
a( "TDZ triggered for this read: if (fail) {" );
const b = $( "do not reach me" );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
