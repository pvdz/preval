# Preval test case

# base.md

> normalize > function > expr > base
>
> a func expr is slightly different from func expr

#TODO

## Input

`````js filename=intro
const f = function g() {
  return $(1)
};
$(f());
`````

## Normalized

`````js filename=intro
const f = function g() {
  const tmpReturnArg = $(1);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function g() {
  const tmpReturnArg = $(1);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
