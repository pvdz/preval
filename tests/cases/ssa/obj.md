# Preval test case

# obj.md

> Ssa > Obj
>
> Object side effect checking was bugged

#TODO

## Input

`````js filename=intro
const tmpArrElement$517 = function () {
  let obj = undefined;
  const f = function (c) {
    obj.bla = c;
  };
  obj = {
    selfRef: f,
  };
};
if ($) $(tmpArrElement$517());
`````

## Pre Normal

`````js filename=intro
const tmpArrElement$517 = function () {
  debugger;
  let obj = undefined;
  const f = function ($$0) {
    let c = $$0;
    debugger;
    obj.bla = c;
  };
  obj = { selfRef: f };
};
if ($) $(tmpArrElement$517());
`````

## Normalized

`````js filename=intro
const tmpArrElement$517 = function () {
  debugger;
  let obj = undefined;
  const f = function ($$0) {
    let c = $$0;
    debugger;
    obj.bla = c;
    return undefined;
  };
  obj = { selfRef: f };
  return undefined;
};
if ($) {
  const tmpCallCallee = $;
  const tmpCalleeParam = tmpArrElement$517();
  tmpCallCallee(tmpCalleeParam);
} else {
}
`````

## Output

`````js filename=intro
if ($) {
  const f = function ($$0) {
    const c = $$0;
    debugger;
    obj.bla = c;
    return undefined;
  };
  const obj = { selfRef: f };
  $(undefined);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same