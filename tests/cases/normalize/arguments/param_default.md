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
let f = function ($tdz$__pattern) {
  let a = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    a = arguments;
    return a;
  } else {
    a = $tdz$__pattern;
    return a;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(1, 2, 3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function ($tdz$__pattern) {
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const SSA_a = arguments;
    return SSA_a;
  } else {
    return $tdz$__pattern;
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
