# Preval test case

# base.md

> Normalize > Dce > Throw > Base
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  throw $(5, 'ret');
  $('fail');
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpThrowArg = $(5, 'ret');
  throw tmpThrowArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpThrowArg = $(5, 'ret');
  throw tmpThrowArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5, 'ret'
 - eval returned: ('<crash[ 5 ]>')

Normalized calls: Same

Final output calls: Same
