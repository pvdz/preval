# Preval test case

# if_false_both_true.md

> Ifelse > Back2back > If false both true
>
> Back to back if statements on same ident may be simplified

#TODO

## Input

`````js filename=intro
let x = $(false, 'a');
if (x) {
  $(x, 'pass');
  x = $(true, 'b');
}
if (x) {
  $(x, 'one');
} else {
  $(x, 'two');
}
`````

## Pre Normal

`````js filename=intro
let x = $(false, 'a');
if (x) {
  $(x, 'pass');
  x = $(true, 'b');
}
if (x) {
  $(x, 'one');
} else {
  $(x, 'two');
}
`````

## Normalized

`````js filename=intro
let x = $(false, 'a');
if (x) {
  $(x, 'pass');
  x = $(true, 'b');
  if (x) {
    $(x, 'one');
  } else {
    $(x, 'two');
  }
} else {
  $(x, 'two');
}
`````

## Output

`````js filename=intro
const x = $(false, 'a');
if (x) {
  $(x, 'pass');
  const tmpSSA_x = $(true, 'b');
  if (tmpSSA_x) {
    $(tmpSSA_x, 'one');
  } else {
    $(tmpSSA_x, 'two');
  }
} else {
  $(x, 'two');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false, 'a'
 - 2: false, 'two'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
