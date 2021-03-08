# Preval test case

# else-vars.md

> Normalize > Return > Else-vars
>
> When both branches end with an update to the binding that is returned, return it immediately.

#TODO

## Input

`````js filename=intro
function f() {
  let x = undefined;
  if ($(1)) {
    $(100);
  } else {
    x = $(2, 'b');
  }
  return x;
}
$(f(), 'result');
`````

## Normalized

`````js filename=intro
let f = function () {
  let x = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(100);
    return x;
  } else {
    x = $(2, 'b');
    return x;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = 'result';
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(100);
    return undefined;
  } else {
    const SSA_x = $(2, 'b');
    return SSA_x;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam, 'result');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: undefined, 'result'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same