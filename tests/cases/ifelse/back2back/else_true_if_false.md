# Preval test case

# else_true_if_false.md

> Ifelse > Back2back > Else true if false
>
> Back to back if statements on same ident may be simplified

#TODO

## Input

`````js filename=intro
let x = $(true, 'a');
if (x) {
} else {
  $(x, 'pass');
  x = $(false, 'b');
}
if (x) {
  $(x, 'hit');
}
`````

## Normalized

`````js filename=intro
let x = $(true, 'a');
if (x) {
} else {
  $(x, 'pass');
  x = $(false, 'b');
}
if (x) {
  $(x, 'hit');
}
`````

## Output

`````js filename=intro
let x = $(true, 'a');
if (x) {
} else {
  $(x, 'pass');
  x = $(false, 'b');
}
if (x) {
  $(x, 'hit');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true, 'a'
 - 2: true, 'hit'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
