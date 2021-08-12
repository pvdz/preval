# Preval test case

# base_expr_rhs_lit_double.md

> Static arg ops > Binary > Base expr rhs lit double
>
> When a function uses a param in the first statement and it is only called then we may be able to outline the first statement

#TODO

## Input

`````js filename=intro
function f(a) {
  1 + a;
  return 2 + a;
}

$(f(1));
$(f(2));
$(f('a'));
$(f(true));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  1 + a;
  return 2 + a;
};
$(f(1));
$(f(2));
$(f(`a`));
$(f(true));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  a + 0;
  const tmpReturnArg = 2 + a;
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(1);
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(2);
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f(`a`);
tmpCallCallee$3(tmpCalleeParam$3);
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = f(true);
tmpCallCallee$5(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
$(3);
$(4);
$(`2a`);
$(3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: '2a'
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same