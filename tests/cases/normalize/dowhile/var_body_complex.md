# Preval test case

# var_body_complex.md

> Normalize > Dowhile > Var body complex
>
> Regression specific to using this kind of init

#TODO

## Input

`````js filename=intro
do var a = $($(2));
while (0);
`````

## Pre Normal

`````js filename=intro
let a = undefined;
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    a = $($(2));
    tmpDoWhileFlag = 0;
  }
}
`````

## Normalized

`````js filename=intro
let a = undefined;
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(2);
  a = tmpCallCallee(tmpCalleeParam);
  tmpDoWhileFlag = 0;
}
`````

## Output

`````js filename=intro
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  const tmpCalleeParam = $(2);
  $(tmpCalleeParam);
  tmpDoWhileFlag = false;
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
