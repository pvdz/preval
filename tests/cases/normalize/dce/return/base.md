# Preval test case

# base.md

> normalize > dce > base
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  return $(5, 'ret');
  $('fail');
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpReturnArg = $(5, 'ret');
  return tmpReturnArg;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpReturnArg = $(5, 'ret');
  return tmpReturnArg;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5, 'ret'
 - 2: 5
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
