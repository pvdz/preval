# Preval test case

# regression2.md

> While > Regression2
>
> Tracking a regression from Tenko

#TODO

## Input

`````js filename=intro
  let cTmp = $(1);
  let cTail = 'fail';
  let n = 0;
  while (true) {
    n = n + 1;
    const tmpIfTest = n < 2;
    if (tmpIfTest) {
      cTail = 'pass';
      cTmp = $(3);
    } else {
      cTmp = cTail;
      break;
    }
  }
  $(cTmp);
`````

## Pre Normal

`````js filename=intro
let cTmp = $(1);
let cTail = `fail`;
let n = 0;
while (true) {
  n = n + 1;
  const tmpIfTest = n < 2;
  if (tmpIfTest) {
    cTail = `pass`;
    cTmp = $(3);
  } else {
    cTmp = cTail;
    break;
  }
}
$(cTmp);
`````

## Normalized

`````js filename=intro
let cTmp = $(1);
let cTail = `fail`;
let n = 0;
while (true) {
  n = n + 1;
  const tmpIfTest = n < 2;
  if (tmpIfTest) {
    cTail = `pass`;
    cTmp = $(3);
  } else {
    cTmp = cTail;
    break;
  }
}
$(cTmp);
`````

## Output

`````js filename=intro
$(1);
$(3);
$(`pass`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
