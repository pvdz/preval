# Preval test case

# too_many_args_no_arguments.md

> Primitive arg inlining > Too many args no arguments
>
> Calling a func with too many params while the func does not access `arguments`

In this case the excessive args can be dropped from the call expression. Their side-effects should still trigger.

#TODO

## Input

`````js filename=intro
function f(a) {
  return a;
}
$(f($(1), $(2), $(3), $(4)));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  return a;
};
$(f($(1), $(2), $(3), $(4)));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  return a;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
const tmpCalleeParam$5 = $(3);
const tmpCalleeParam$7 = $(4);
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5, tmpCalleeParam$7);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(1);
$(2);
$(3);
$(4);
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
