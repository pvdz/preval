# Preval test case

# first_test_write_not_var.md

> Unwind loops > Separate test > First test write not var
>
> Unrolling loops

## Input

`````js filename=intro
while (test) {
  $('yolo');
  counter = counter + 1;
  test = counter < 10;
}
while (test) {
  $('yolo');
  counter = counter + 1;
  test = counter < 10;
}
let counter = 0;
let test = counter < 10;
`````

## Pre Normal


`````js filename=intro
while ($throwTDZError(`Preval: TDZ triggered for this read: while (test) {`)) {
  $(`yolo`);
  $throwTDZError(`Preval: TDZ triggered for this read: counter + 1`) + 1,
    $throwTDZError(
      `Preval: TDZ triggered for this assignment: counter = \$throwTDZError(\`Preval: TDZ triggered for this read: counter + 1\`) + 1`,
    );
  $throwTDZError(`Preval: TDZ triggered for this read: counter < 10`) < 10,
    $throwTDZError(
      `Preval: TDZ triggered for this assignment: test = \$throwTDZError(\`Preval: TDZ triggered for this read: counter < 10\`) < 10`,
    );
}
while ($throwTDZError(`Preval: TDZ triggered for this read: while (test) {`)) {
  $(`yolo`);
  $throwTDZError(`Preval: TDZ triggered for this read: counter + 1`) + 1,
    $throwTDZError(
      `Preval: TDZ triggered for this assignment: counter = \$throwTDZError(\`Preval: TDZ triggered for this read: counter + 1\`) + 1`,
    );
  $throwTDZError(`Preval: TDZ triggered for this read: counter < 10`) < 10,
    $throwTDZError(
      `Preval: TDZ triggered for this assignment: test = \$throwTDZError(\`Preval: TDZ triggered for this read: counter < 10\`) < 10`,
    );
}
let counter = 0;
let test = counter < 10;
`````

## Normalized


`````js filename=intro
while (true) {
  throw `Preval: TDZ triggered for this read: while (test) {`;
}
while (true) {
  throw `Preval: TDZ triggered for this read: while (test) {`;
}
let counter = 0;
let test = counter < 10;
`````

## Output


`````js filename=intro
throw `Preval: TDZ triggered for this read: while (test) {`;
`````

## PST Output

With rename=true

`````js filename=intro
throw "Preval: TDZ triggered for this read: while (test) {";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
