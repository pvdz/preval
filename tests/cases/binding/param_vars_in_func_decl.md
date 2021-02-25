# Preval test case

# param_vars_in_func_decl.md

> Binding > Param vars in func decl
>
> Param that also has a var in same scope. Prettier (minified) does this.

#TODO

## Input

`````js filename=intro
function f(a) {
  var a = $(10), b = $(20);
  return [a, b];
}
$(f());
`````

## Normalized

`````js filename=intro
function f(a) {
  var b;
  a = $(10);
  b = $(20);
  const tmpReturnArg = [a, b];
  return tmpReturnArg;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(a) {
  const SSA_a = $(10);
  const b = $(20);
  const tmpReturnArg = [SSA_a, b];
  return tmpReturnArg;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: [10, 20]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same