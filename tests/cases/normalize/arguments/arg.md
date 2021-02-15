# Preval test case

# arg.md

> normalize > arguments > arg
>
> This was causing a problem when arguments was passed on in a call.

#TODO

## Input

`````js filename=intro
function f() {
  f.apply(this, arguments);
}
`````

## Normalized

`````js filename=intro
function f() {
  const tmpCallObj = f;
  const tmpCallVal = tmpCallObj.apply;
  const tmpCalleeParam = this;
  const tmpCalleeParam$1 = arguments;
  tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
}
`````

## Output

`````js filename=intro
function f() {
  const tmpCallVal = f.apply;
  const tmpCalleeParam = this;
  const tmpCalleeParam$1 = arguments;
  tmpCallVal.call(f, tmpCalleeParam, tmpCalleeParam$1);
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
