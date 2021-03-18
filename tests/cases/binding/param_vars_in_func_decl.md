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

## Pre Normal

`````js filename=intro
let f = function (a) {
  let b = undefined;
  (a = $(10)), (b = $(20));
  return [a, b];
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function (a) {
  let b = undefined;
  a = $(10);
  b = $(20);
  const tmpReturnArg = [a, b];
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const SSA_a = $(10);
const SSA_b = $(20);
const tmpReturnArg = [SSA_a, SSA_b];
$(tmpReturnArg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: [10, 20]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
