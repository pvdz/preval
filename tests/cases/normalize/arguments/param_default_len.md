# Preval test case

# param_default_len.md

> Normalize > Arguments > Param default len
>
> The `arguments` object is a valid default expression

#TODO

## Input

`````js filename=intro
function f(a = arguments.length) {
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
    a = arguments.length;
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
    const SSA_a = arguments.length;
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
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
