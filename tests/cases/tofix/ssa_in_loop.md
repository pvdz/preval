# Preval test case

# ssa_in_loop.md

> Tofix > Ssa in loop
>
> When inside a loop and writing to an outside binding, if the binding was not used before inside the loop and not after the loop then it can be ssa'd

#TODO

## Input

`````js filename=intro
const s = $(10);
let $tmpLoopUnrollCheck = $LOOP_UNROLL_10;
parseExpression(lexerFlags$285, astProp$181);
let tmpClusterSSA_s = s | 10;
let tmpClusterSSA_x = $(true);
if (tmpClusterSSA_x) {}
else {
  $tmpLoopUnrollCheck = false;
}
while ($tmpLoopUnrollCheck) {
  parseExpression(lexerFlags$285, astProp$181);
  tmpClusterSSA_s = tmpClusterSSA_s | 10;
  tmpClusterSSA_x = $(true);
  if (tmpClusterSSA_x) {}
  else {
    break;
  }
}
$(tmpClusterSSA_s);
`````

## Pre Normal

`````js filename=intro
const s = $(10);
let $tmpLoopUnrollCheck = $LOOP_UNROLL_10;
parseExpression(lexerFlags$285, astProp$181);
let tmpClusterSSA_s = s | 10;
let tmpClusterSSA_x = $(true);
if (tmpClusterSSA_x) {
} else {
  $tmpLoopUnrollCheck = false;
}
while ($tmpLoopUnrollCheck) {
  parseExpression(lexerFlags$285, astProp$181);
  tmpClusterSSA_s = tmpClusterSSA_s | 10;
  tmpClusterSSA_x = $(true);
  if (tmpClusterSSA_x) {
  } else {
    break;
  }
}
$(tmpClusterSSA_s);
`````

## Normalized

`````js filename=intro
const s = $(10);
let $tmpLoopUnrollCheck = $LOOP_UNROLL_10;
parseExpression(lexerFlags$285, astProp$181);
let tmpClusterSSA_s = s | 10;
let tmpClusterSSA_x = $(true);
if (tmpClusterSSA_x) {
} else {
  $tmpLoopUnrollCheck = false;
}
while ($tmpLoopUnrollCheck) {
  parseExpression(lexerFlags$285, astProp$181);
  tmpClusterSSA_s = tmpClusterSSA_s | 10;
  tmpClusterSSA_x = $(true);
  if (tmpClusterSSA_x) {
  } else {
    break;
  }
}
$(tmpClusterSSA_s);
`````

## Output

`````js filename=intro
const s = $(10);
let $tmpLoopUnrollCheck = $LOOP_UNROLL_10;
parseExpression(lexerFlags$285, astProp$181);
let tmpClusterSSA_s = s | 10;
let tmpClusterSSA_x = $(true);
if (tmpClusterSSA_x) {
} else {
  $tmpLoopUnrollCheck = false;
}
while ($tmpLoopUnrollCheck) {
  parseExpression(lexerFlags$285, astProp$181);
  tmpClusterSSA_s = tmpClusterSSA_s | 10;
  tmpClusterSSA_x = $(true);
  if (tmpClusterSSA_x) {
  } else {
    break;
  }
}
$(tmpClusterSSA_s);
`````

## Globals

BAD@! Found 3 implicit global bindings:

parseExpression, lexerFlags$285, astProp$181

## Result

Should call `$` with:
 - 1: 10
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
