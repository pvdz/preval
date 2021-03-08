# Preval test case

# if_false_else_true.md

> Ifelse > Back2back > If false else true
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
} else {
  $(x, 'hit');
}
`````

## Normalized

`````js filename=intro
let x = $(false, 'a');
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
let x = $(false, 'a');
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
 - 1: false, 'a'
 - 2: false, 'hit'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same