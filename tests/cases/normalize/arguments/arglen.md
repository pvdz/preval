# Preval test case

# arglen.md

> Normalize > Arguments > Arglen
>
> This was causing a problem when arguments was passed on in a call.

#TODO

## Input

`````js filename=intro
function f() {
  f.apply(this, arguments.length);
}
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCallObj = f;
  const tmpCallVal = tmpCallObj.apply;
  const tmpCalleeParam = this;
  const tmpCalleeParam$1 = arguments.length;
  tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
};
`````

## Output

`````js filename=intro
const f = function () {
  const tmpCallVal = f.apply;
  const tmpCalleeParam = this;
  const tmpCalleeParam$1 = arguments.length;
  tmpCallVal.call(f, tmpCalleeParam, tmpCalleeParam$1);
};
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
