# Preval test case

# mutable_param.md

> function > mutable_param
>
> Param names can be written to

#TODO

## Input

`````js filename=intro
function f(a) {
  a = $(10);
  return a;
}
$(f());
`````

## Normalized

`````js filename=intro
function f(a) {
  a = $(10);
  return a;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(a) {
  a = $(10);
  return a;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
