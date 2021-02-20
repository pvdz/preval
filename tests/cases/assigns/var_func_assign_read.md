# Preval test case

# var_func_assign_read.md

> Assigns > Var func assign read
>
> Turning a var into a const. Or not.

#TODO

## Input

`````js filename=intro
var x;
x = 20; // Can be made into a constant
var f = () => x = 10;
x = 30; // Can not be made into a constant because of the arrow
$(f());
$(x);
`````

## Normalized

`````js filename=intro
var f;
var x;
x = 20;
f = () => {
  x = 10;
  let tmpReturnArg = x;
  return tmpReturnArg;
};
x = 30;
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(x);
`````

## Output

`````js filename=intro
let SSA_x = 20;
const f = () => {
  SSA_x = 10;
  const tmpReturnArg = SSA_x;
  return tmpReturnArg;
};
SSA_x = 30;
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(SSA_x);
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
