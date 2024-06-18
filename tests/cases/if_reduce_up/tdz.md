# Preval test case

# tdz.md

> If reduce up > Tdz
>
> Trivial case

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
if ($throwTDZError(`Preval: TDZ triggered for this read: if (fail) {`)) {
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
throw `Preval: TDZ triggered for this read: if (fail) {`;
let fail = 0;
`````

## Output


`````js filename=intro
throw `Preval: TDZ triggered for this read: if (fail) {`;
`````

## PST Output

With rename=true

`````js filename=intro
throw "Preval: TDZ triggered for this read: if (fail) {";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
