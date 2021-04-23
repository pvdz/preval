# Preval test case

# param_vars_in_func_expr.md

> Binding > Param vars in func expr
>
> Param that also has a var in same scope. Prettier (minified) does this.

#TODO

## Input

`````js filename=intro
const f = function(a) {
  var a = $(10), b = $(20);
  return [a, b];
}
$(f());
`````

## Pre Normal

`````js filename=intro
const f = function ($$0) {
  let a = $$0;
  debugger;
  let b = undefined;
  (a = $(10)), (b = $(20));
  return [a, b];
};
$(f());
`````

## Normalized

`````js filename=intro
const f = function ($$0) {
  let a = $$0;
  debugger;
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
const tmpSSA_a = $(10);
const b = $(20);
const tmpReturnArg = [tmpSSA_a, b];
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
