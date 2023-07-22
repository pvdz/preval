# Preval test case

# empty_body.md

> Normalize > While > Empty body
>
> A loop cannot be eliminated but can be normalized

#TODO

## Input

`````js filename=intro
while ($());
`````

## Pre Normal

`````js filename=intro
while ($());
`````

## Normalized

`````js filename=intro
let tmpIfTest = $();
while (true) {
  if (tmpIfTest) {
    tmpIfTest = $();
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let tmpIfTest = $();
const $tmpLoopUnrollCheck = tmpIfTest;
if (tmpIfTest) {
  tmpIfTest = $();
} else {
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      tmpIfTest = $();
    } else {
      break;
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $();
const b = a;
if (a) {
  a = $();
}
if (b) {
  while ($LOOP_UNROLL_10) {
    if (a) {
      a = $();
    }
    else {
      break;
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
