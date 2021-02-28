# Preval test case

# both_false_if_true.md

> Ifelse > Back2back > Both false if true
>
> Back to back if statements on same ident may be simplified

#TODO

## Input

`````js filename=intro
let x = $(false);
if (x) {
  $(x, 'A');
  x = $(true);
} else {
  $(x, 'B');
  x = $(true);
}
if (x) {
  $(x, 'hit');
}
`````

## Normalized

`````js filename=intro
let x = $(false);
if (x) {
  $(x, 'A');
  x = $(true);
} else {
  $(x, 'B');
  x = $(true);
}
if (x) {
  $(x, 'hit');
}
`````

## Output

`````js filename=intro
let x = $(false);
if (x) {
  $(x, 'A');
  x = $(true);
} else {
  $(x, 'B');
  x = $(true);
}
if (x) {
  $(x, 'hit');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: false, 'B'
 - 3: true
 - 4: true, 'hit'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
