# Preval test case

# if_true_else_true.md

> Ifelse > Back2back > If true else true
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
} else {
  $(x, 'hit');
}
`````

## Normalized

`````js filename=intro
let x = $(true, 'a');
if (x) {
  $(x, 'pass');
  x = $(true, 'b');
}
if (x) {
} else {
  $(x, 'hit');
}
`````

## Output

`````js filename=intro
let x = $(true, 'a');
if (x) {
  $(x, 'pass');
  x = $(true, 'b');
}
if (x) {
} else {
  $(x, 'hit');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true, 'a'
 - 2: true, 'pass'
 - 3: true, 'b'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
