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

## Normalized

`````js filename=intro
let f = function (a) {
  const tmpCallCallee = $;
  const tmpCalleeParam = arguments.length;
  tmpCallCallee(tmpCalleeParam);
  return a;
};
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpCalleeParam$2 = $(1);
const tmpCalleeParam$3 = $(2);
const tmpCalleeParam$4 = $(3);
const tmpCalleeParam$5 = $(4);
const tmpCalleeParam$1 = tmpCallCallee$2(tmpCalleeParam$2, tmpCalleeParam$3, tmpCalleeParam$4, tmpCalleeParam$5);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function (a) {
  const tmpCalleeParam = arguments.length;
  $(tmpCalleeParam);
  return a;
};
const tmpCalleeParam$2 = $(1);
const tmpCalleeParam$3 = $(2);
const tmpCalleeParam$4 = $(3);
const tmpCalleeParam$5 = $(4);
const tmpCalleeParam$1 = f(tmpCalleeParam$2, tmpCalleeParam$3, tmpCalleeParam$4, tmpCalleeParam$5);
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
 - 5: 4
 - 6: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
