# Preval test case

# and_set.md

> Bit hacks > And set
>
> Checking whether both bits are set

#TODO

## Input

`````js filename=intro
const a = x & 1;
const atest = a === 1;
if (atest) {
  const b = x & 4;
  const btest = b === 4;
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
const atest = a === 1;
if (atest) {
  const b = x & 4;
  const btest = b === 4;
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
const atest = a === 1;
if (atest) {
  const b = x & 4;
  const btest = b === 4;
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
