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
while (true) {
  if ($tmpLoopUnrollCheck) {
    parseExpression(lexerFlags$285, astProp$181);
    tmpClusterSSA_s = tmpClusterSSA_s | 10;
    tmpClusterSSA_x = $(true);
    if (tmpClusterSSA_x) {
    } else {
      break;
    }
  } else {
    break;
  }
}
$(tmpClusterSSA_s);
`````

## Output


`````js filename=intro
const s = $(10);
parseExpression(lexerFlags$285, astProp$181);
let tmpClusterSSA_s = s | 10;
const tmpClusterSSA_x = $(true);
if (tmpClusterSSA_x) {
  parseExpression(lexerFlags$285, astProp$181);
  tmpClusterSSA_s = tmpClusterSSA_s | 10;
  const tmpClusterSSA_x$1 = $(true);
  if (tmpClusterSSA_x$1) {
    while ($LOOP_UNROLL_10) {
      parseExpression(lexerFlags$285, astProp$181);
      tmpClusterSSA_s = tmpClusterSSA_s | 10;
      const tmpClusterSSA_x$2 = $(true);
      if (tmpClusterSSA_x$2) {
      } else {
        break;
      }
    }
  } else {
  }
} else {
}
$(tmpClusterSSA_s);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
parseExpression( lexerFlags$285, astProp$181 );
let b = a | 10;
const c = $( true );
if (c) {
  parseExpression( lexerFlags$285, astProp$181 );
  b = b | 10;
  const d = $( true );
  if (d) {
    while ($LOOP_UNROLL_10) {
      parseExpression( lexerFlags$285, astProp$181 );
      b = b | 10;
      const e = $( true );
      if (e) {

      }
      else {
        break;
      }
    }
  }
}
$( b );
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
