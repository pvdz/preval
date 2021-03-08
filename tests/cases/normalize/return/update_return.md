# Preval test case

# update_return.md

> Normalize > Return > Update return
>
> The branch updates the value that is finally returned. Does it combine them after inlining the return into the branches?

#TODO

## Input

`````js filename=intro
function f() {
  let x = undefined;
  if ($(1)) {
    x = 10;
  }
  return x;
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let x = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    x = 10;
    return x;
  } else {
    return x;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  let x = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    x = 10;
    return x;
  } else {
    return x;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same