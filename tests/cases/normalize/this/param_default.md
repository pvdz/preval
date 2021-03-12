# Preval test case

# param_default.md

> Normalize > This > Param default
>
> The `this` object is a valid default expression

#TODO

## Input

`````js filename=intro
function f(a = this) {
  return a;
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let a = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    a = this;
    return a;
  } else {
    a = $tdz$__pattern;
    return a;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function ($tdz$__pattern) {
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const SSA_a = this;
    return SSA_a;
  } else {
    return $tdz$__pattern;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
