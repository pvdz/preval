# Preval test case

# or_set.md

> Bit hacks > Or set
>
> Checking whether either or both of two bits are set

#TODO

## Input

`````js filename=intro
const a = x & 1;
let test = a === 1;
if (test) {
} else {
  const b = x & 4;
  test = b === 4;
}
if (test) {
  $('yes');
} else {
  $('no 2');
}
`````

## Pre Normal

`````js filename=intro
const a = x & 1;
let test = a === 1;
if (test) {
} else {
  const b = x & 4;
  test = b === 4;
}
if (test) {
  $(`yes`);
} else {
  $(`no 2`);
}
`````

## Normalized

`````js filename=intro
const a = x & 1;
let test = a === 1;
if (test) {
} else {
  const b = x & 4;
  test = b === 4;
}
if (test) {
  $(`yes`);
} else {
  $(`no 2`);
}
`````

## Output

`````js filename=intro
const a = x & 1;
if (a) {
  $(`yes`);
} else {
  const b = x & 4;
  if (b) {
    $(`yes`);
  } else {
    $(`no 2`);
  }
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
