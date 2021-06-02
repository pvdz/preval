# Preval test case

# base_bool_unknown_false.md

> Type tracked > If > Base bool unknown false
>
> Even if we don't know about the concrete value of a binding, sometimes the type is sufficient for optimization

#TODO

## Input

`````js filename=intro
const a = $(true);
const x = a === true;
if (x) {
  $(x, 'pass');
} else {
  $(x, 'false');
}
`````

## Pre Normal

`````js filename=intro
const a = $(true);
const x = a === true;
if (x) {
  $(x, 'pass');
} else {
  $(x, 'false');
}
`````

## Normalized

`````js filename=intro
const a = $(true);
const x = a === true;
if (x) {
  $(x, 'pass');
} else {
  $(x, 'false');
}
`````

## Output

`````js filename=intro
const a = $(true);
const x = a === true;
if (x) {
  $(true, 'pass');
} else {
  $(false, 'false');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: true, 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
