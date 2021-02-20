# Preval test case

# block1.md

> Normalize > Dce > Throw > Block1
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  {
    throw $(7, 'throw');
  }
  $('fail');
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpThrowArg = $(7, 'throw');
  throw tmpThrowArg;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpThrowArg = $(7, 'throw');
  throw tmpThrowArg;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 7, 'throw'
 - eval returned: ('<crash[ 7 ]>')

Normalized calls: Same

Final output calls: Same
