# Preval test case

# param_var_in_func_expr.md

> Binding > Param var in func expr
>
> Param that also has a var in same scope. Prettier (minified) does this.

#TODO

## Input

`````js filename=intro
const f = function(a) {
  var a = $(10);
  return a;
}
$(f());
`````

## Normalized

`````js filename=intro
const f = function (a) {
  a = $(10);
  return a;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (a) {
  const SSA_a = $(10);
  return SSA_a;
};
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
