# Preval test case

# too_many_args_with_arguments.md

> Primitive arg inlining > Too many args with arguments
>
> Calling a func with too many params while the func accesses `arguments`

In this case the excessive args can not be dropped because they might be reflected upon through `arguments`.

#TODO

## Input

`````js filename=intro
function f(a) {
  $(arguments.length);
  return a;
}
$(f($(1), $(2), $(3), $(4)));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpArgumentsLen = arguments.length;
  let a = $$0;
  debugger;
  $(tmpArgumentsLen);
  return a;
};
$(f($(1), $(2), $(3), $(4)));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpArgumentsLen = arguments.length;
  let a = $$0;
  debugger;
  $(tmpArgumentsLen);
  return a;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$2 = $(2);
const tmpCalleeParam$3 = $(3);
const tmpCalleeParam$4 = $(4);
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2, tmpCalleeParam$3, tmpCalleeParam$4);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpArgumentsLen = arguments.length;
  const a = $$0;
  debugger;
  $(tmpArgumentsLen);
  return a;
};
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$2 = $(2);
const tmpCalleeParam$3 = $(3);
const tmpCalleeParam$4 = $(4);
const tmpCalleeParam = f(tmpCalleeParam$1, tmpCalleeParam$2, tmpCalleeParam$3, tmpCalleeParam$4);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 4
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
