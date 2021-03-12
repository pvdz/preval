# Preval test case

# param_default.md

> Normalize > Arguments > Param default
>
> The `arguments` object is a valid default expression

#TODO

## Input

`````js filename=intro
function f(a = arguments) {
  return a;
}
$(f(1, 2, 3));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let a = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    a = arguments;
    return a;
  } else {
    a = tmpParamDefault;
    return a;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(1, 2, 3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const SSA_a = arguments;
    return SSA_a;
  } else {
    return tmpParamDefault;
  }
};
const tmpCalleeParam = f(1, 2, 3);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
