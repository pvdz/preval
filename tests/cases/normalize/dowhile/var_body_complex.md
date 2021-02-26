# Preval test case

# var_body_complex.md

> Normalize > Dowhile > Var body complex
>
> Regression specific to using this kind of init

#TODO

## Input

`````js filename=intro
do var a = b(c(2));
while (0);
`````

## Normalized

`````js filename=intro
let a = undefined;
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    tmpIfTest = 0;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    const tmpCallCallee = b;
    const tmpCalleeParam = c(2);
    a = tmpCallCallee(tmpCalleeParam);
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    tmpIfTest = 0;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    const tmpCallCallee = b;
    const tmpCalleeParam = c(2);
    tmpCallCallee(tmpCalleeParam);
  } else {
    break;
  }
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

b, c

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
