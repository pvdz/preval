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
while (x) {
  const nowAssignable$3 = parseExpression(lexerFlags$285, astProp$181);
  s = s | 10;
  x = $(true);
}
$(s);
`````

## Output

`````js filename=intro
let s = $(10);
let x = true;
while (x) {
  parseExpression(lexerFlags$285, astProp$181);
  s = s | 10;
  x = $(true);
}
$(s);
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
