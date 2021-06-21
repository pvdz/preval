# Preval test case

# neq_if_neq_true_bad2.md

> Conditional typing > Neq if neq true bad2
>
> Assignment that cannot be observed should be dropped

#TODO

## Input

`````js filename=intro
const a = $(67636);
let x = a !== 67636;
if (x) {
  x = a !== 67636;
  throw `Preval: Cannot write to const binding \`a\``;
} else {
  f(`Preval: Cannot write to const binding \`a\``);
}
$(x);
`````

## Pre Normal

`````js filename=intro
const a = $(67636);
let x = a !== 67636;
if (x) {
  x = a !== 67636;
  throw `Preval: Cannot write to const binding \`a\``;
} else {
  f(`Preval: Cannot write to const binding \`a\``);
}
$(x);
`````

## Normalized

`````js filename=intro
const a = $(67636);
let x = a !== 67636;
if (x) {
  x = a !== 67636;
  throw `Preval: Cannot write to const binding \`a\``;
} else {
  f(`Preval: Cannot write to const binding \`a\``);
  $(x);
}
`````

## Output

`````js filename=intro
const a = $(67636);
const x = a === 67636;
if (x) {
  f(`Preval: Cannot write to const binding \`a\``);
  $(false);
} else {
  throw `Preval: Cannot write to const binding \`a\``;
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

f

## Result

Should call `$` with:
 - 1: 67636
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
