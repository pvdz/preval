# Preval test case

# out_if_inside_if.md

> Ssa > Single scope > Out if inside if
>
> This should be SSA'd

#TODO

## Input

`````js filename=intro
let dedupeMe = !tmpUnaryArg$83;
if (dedupeMe) {
  $(true, 'abc');
} else {
  const c = props$15.children;
  dedupeMe = c == null;
  $(dedupeMe, 'xyz');
}
`````

## Pre Normal

`````js filename=intro
let dedupeMe = !tmpUnaryArg$83;
if (dedupeMe) {
  $(true, 'abc');
} else {
  const c = props$15.children;
  dedupeMe = c == null;
  $(dedupeMe, 'xyz');
}
`````

## Normalized

`````js filename=intro
let dedupeMe = !tmpUnaryArg$83;
if (dedupeMe) {
  $(true, 'abc');
} else {
  const c = props$15.children;
  dedupeMe = c == null;
  $(dedupeMe, 'xyz');
}
`````

## Output

`````js filename=intro
tmpUnaryArg$83;
if (tmpUnaryArg$83) {
  const c = props$15.children;
  const tmpSSA_dedupeMe = c == null;
  $(tmpSSA_dedupeMe, 'xyz');
} else {
  $(true, 'abc');
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

tmpUnaryArg$83, props$15

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
