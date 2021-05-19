# Preval test case

# and_unset.md

> Bit hacks > And unset
>
> Checking whether both bits are unset

#TODO

## Input

`````js filename=intro
const a = x & 1;
const atest = a === 0;
if (atest) {
  const b = x & 4;
  const btest = b === 0;
  if (btest) {
    $('yes');
  } else {
    $('no 2');
  }
} else {
  $('no 1');
}
`````

## Pre Normal

`````js filename=intro
const a = x & 1;
const atest = a === 0;
if (atest) {
  const b = x & 4;
  const btest = b === 0;
  if (btest) {
    $('yes');
  } else {
    $('no 2');
  }
} else {
  $('no 1');
}
`````

## Normalized

`````js filename=intro
const a = x & 1;
const atest = a === 0;
if (atest) {
  const b = x & 4;
  const btest = b === 0;
  if (btest) {
    $('yes');
  } else {
    $('no 2');
  }
} else {
  $('no 1');
}
`````

## Output

`````js filename=intro
const a = x & 1;
if (a) {
  const b = x & 4;
  if (b) {
    $('yes');
  } else {
    $('no 2');
  }
} else {
  $('no 1');
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
