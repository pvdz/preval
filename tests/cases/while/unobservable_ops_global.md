# Preval test case

# unobservable_ops_global.md

> While > Unobservable ops global
>
> A static operation that can not be observed inside the loop and is not depended on the loop count should be moved out.

#TODO

## Input

`````js filename=intro
let s = $(10);
let x = true;
while (x) {
  const nowAssignable$3 = parseExpression(lexerFlags$285, astProp$181);
  s = s | 10; // This line can be moved outward since `s` can not be observed
  x = $(true);
}
$(s);
`````

## Pre Normal

`````js filename=intro
let s = $(10);
let x = true;
while (x) {
  const nowAssignable$3 = parseExpression(lexerFlags$285, astProp$181);
  s = s | 10;
  x = $(true);
}
$(s);
`````

## Normalized

`````js filename=intro
let s = $(10);
let x = true;
while (true) {
  if (x) {
    const nowAssignable$3 = parseExpression(lexerFlags$285, astProp$181);
    s = s | 10;
    x = $(true);
  } else {
    break;
  }
}
$(s);
`````

## Output

`````js filename=intro
const s = $(10);
parseExpression(lexerFlags$285, astProp$181);
let tmpClusterSSA_s = s | 10;
let tmpClusterSSA_x = $(true);
const $tmpLoopUnrollCheck = tmpClusterSSA_x;
if (tmpClusterSSA_x) {
  parseExpression(lexerFlags$285, astProp$181);
  tmpClusterSSA_s = tmpClusterSSA_s | 10;
  tmpClusterSSA_x = $(true);
} else {
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_x) {
      parseExpression(lexerFlags$285, astProp$181);
      tmpClusterSSA_s = tmpClusterSSA_s | 10;
      tmpClusterSSA_x = $(true);
    } else {
      break;
    }
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
let c = $( true );
const d = c;
if (c) {
  parseExpression( lexerFlags$285, astProp$181 );
  b = b | 10;
  c = $( true );
}
if (d) {
  while ($LOOP_UNROLL_9) {
    if (c) {
      parseExpression( lexerFlags$285, astProp$181 );
      b = b | 10;
      c = $( true );
    }
    else {
      break;
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
