# Preval test case

# arg_as_var_decl.md

> Function > Arg as var decl
>
> In this case the function param is used to declare a param

This is more of an old pattern or an artifact or whatever.

We can't eliminate the param name because that affects func.length, however we should be able to SSA the assignment.

#TODO

## Input

`````js filename=intro
function f(x) {
  x = $(10);
  return x;
}

$(f());
`````

## Normalized

`````js filename=intro
function f(x) {
  x = $(10);
  return x;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(x) {
  const SSA_x = $(10);
  return SSA_x;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same