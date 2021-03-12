# Preval test case

# return_sequence_prop.md

> Normalize > Sequence > Return sequence prop
>
> Returning a member express on a sequence

#TODO

## Input

`````js filename=intro
function f() {
  return ($(1), $(2)).foo
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return ($(1), $(2)).foo;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  $(1);
  const tmpCompObj = $(2);
  const tmpReturnArg = tmpCompObj.foo;
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  $(1);
  const tmpCompObj = $(2);
  const tmpReturnArg = tmpCompObj.foo;
  return tmpReturnArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
