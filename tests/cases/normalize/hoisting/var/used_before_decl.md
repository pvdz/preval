# Preval test case

# used_before_decl.md

> Normalize > Hoisting > Var > Used before decl
>
> Hoisting a var puts the var declaration at the top while actually invoking the initialization at the point of code. Normalization should fix this.

#TODO

## Input

`````js filename=intro
function f() {
  a = $();
  var a = $();
  return a;
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = undefined;
  a = $();
  a = $();
  return a;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  $();
  const SSA_a$1 = $();
  return SSA_a$1;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
