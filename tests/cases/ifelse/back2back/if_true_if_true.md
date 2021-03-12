# Preval test case

# if_true_if_true.md

> Ifelse > Back2back > If true if true
>
> Back to back if statements on same ident may be simplified

#TODO

## Input

`````js filename=intro
let x = $(true, 'a');
if (x) {
  $(x, 'pass');
  x = $(true, 'b');
}
if (x) {
  $(x, 'hit');
}
`````

## Pre Normal

`````js filename=intro
let x = $(true, 'a');
if (x) {
  $(x, 'pass');
  x = $(true, 'b');
}
if (x) {
  $(x, 'hit');
}
`````

## Normalized

`````js filename=intro
let x = $(true, 'a');
if (x) {
  $(x, 'pass');
  x = $(true, 'b');
  if (x) {
    $(x, 'hit');
  }
}
`````

## Output

`````js filename=intro
const x = $(true, 'a');
if (x) {
  $(x, 'pass');
  const SSA_x = $(true, 'b');
  if (SSA_x) {
    $(SSA_x, 'hit');
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true, 'a'
 - 2: true, 'pass'
 - 3: true, 'b'
 - 4: true, 'hit'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
